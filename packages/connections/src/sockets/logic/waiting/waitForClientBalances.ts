import type { Balance } from '@compyto/balancing/domain';
import type { Device } from '@compyto/connections/domain';
import { monitoring } from '@compyto/monitoring/logic';

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
      monitoring.emit('info:connections/person-as-client-connected', device);
      const connection = createSocketConnection(client, device);
      connections.push(connection);

      if (connections.length === balances.length) {
        callback(connections);
      }
    });

    monitoring.emit('info:connections/person-as-client-connecting-started');
    // @ts-expect-error Property 'connect' does not exist on type 'Socket'.
    client.connect();
  });
}
