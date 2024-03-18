import type { Balance } from '@/balancing/domain';
import type { Device } from '@/connections/domain';
import { Settings } from '@/runner/domain';
import {
  getClientBalancesByDevice,
  getServerBalancesByDevice,
} from '@/balancing/logic';
import { monitoring } from '@/monitoring/logic';

import { Event, type Socket, type SocketConnection } from '../domain';
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

  io.once(Event.IDENTIFICATION, (device: Device) => {
    monitoring.emit('info:connections/person-identification-received', device);
    connections.push(createSocketConnection(io, device));
  });

  io.once(Event.BALANCES, (balances: Balance[]) => {
    monitoring.emit('info:connections/person-balances-received', balances);

    const clientBalances = getClientBalancesByDevice(balances, selfDevice);
    const serverBalances = getServerBalancesByDevice(balances, selfDevice);
    const allBalances = [...clientBalances, ...serverBalances];

    if (clientBalances.length) {
      waitForClientBalances(clientBalances, selfDevice, (c) => {
        connections.push(...c);

        if (connections.length - 1 === allBalances.length) {
          ready();
        }
      });
    }

    if (serverBalances.length) {
      waitForServerBalances(serverBalances, selfDevice, (c) => {
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
  monitoring.emit('info:connections/person-started');
}
