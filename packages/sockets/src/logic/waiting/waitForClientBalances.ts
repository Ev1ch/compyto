import type { Balance } from '@compyto/balancing';
import type { Device } from '@compyto/connections';
import { runtime } from '@compyto/runtime';

import { SocketEvent, type SocketConnection } from '../../domain';
import { createSocketClient, createSocketConnection } from '../creators';

export type WaitForClientBalancesCallback = (
  connections: SocketConnection[],
) => void;

export default function waitForClientBalances(
  balances: Balance[],
  selfDevice: Device,
  callback: WaitForClientBalancesCallback,
) {
  const connections: SocketConnection[] = [];

  balances.forEach((balance) => {
    const client = createSocketClient(balance.server.uri, selfDevice);

    client.once(SocketEvent.IDENTIFICATION, (device: Device) => {
      runtime.monitoring?.emit(
        'info:connections/person-as-client-connected',
        device,
      );
      const connection = createSocketConnection(client, device);
      connections.push(connection);

      if (connections.length === balances.length) {
        callback(connections);
      }
    });

    runtime.monitoring?.emit(
      'info:connections/person-as-client-connecting-started',
    );
    // @ts-expect-error Property 'connect' does not exist on type 'Socket'.
    client.connect();
  });
}
