import {
  getClientBalancesByDevice,
  getServerBalancesByDevice,
  type Balance,
} from '@compyto/balancing';
import type { Device } from '@compyto/connections';
import { runtime } from '@compyto/runtime';
import type { Settings } from '@compyto/settings';

import { SocketEvent, type Socket, type SocketConnection } from '../domain';
import { createSocketClient, createSocketConnection } from './creators';
import { waitForClientBalances, waitForServerBalances } from './waiting';

export type StartPersonCallback = (
  io: Socket,
  connections: SocketConnection[],
) => void;

export default function startPerson(
  master: Exclude<Settings['master'], undefined>,
  selfDevice: Device,
  callback: StartPersonCallback,
) {
  const io = createSocketClient(master.uri, selfDevice);
  const connections: SocketConnection[] = [];

  function ready() {
    callback(io, connections);
  }

  io.once(SocketEvent.IDENTIFICATION, (device: Device) => {
    runtime.monitoring?.emit(
      'info:connections/person-identification-received',
      device,
    );
    connections.push(createSocketConnection(io, device));
  });

  io.once(SocketEvent.BALANCES, (balances: Balance[]) => {
    runtime.monitoring?.emit(
      'info:connections/person-balances-received',
      balances,
    );

    const clientBalances = getClientBalancesByDevice(balances, selfDevice);
    const serverBalances = getServerBalancesByDevice(balances, selfDevice);
    const allBalances = [...clientBalances, ...serverBalances];

    if (clientBalances.length) {
      waitForClientBalances(clientBalances, selfDevice, (c) => {
        runtime.monitoring?.emit(
          'info:connections/connected-as-client-to-all-balanced-servers',
        );
        connections.push(...c);

        if (connections.length - 1 === allBalances.length) {
          ready();
        }
      });
    }

    if (serverBalances.length) {
      waitForServerBalances(serverBalances, selfDevice, (c) => {
        runtime.monitoring?.emit(
          'info:connections/got-all-clients-as-balanced-server',
        );
        connections.push(...c);

        if (connections.length - 1 === allBalances.length) {
          ready();
        }
      });
    }

    if (!allBalances.length) {
      ready();
    }
  });

  io.on('error', (error) => {
    throw error;
  });

  // @ts-expect-error Property 'connect' does not exist on type 'Socket'.
  io.connect();
  runtime.monitoring?.emit('info:connections/person-started');
}
