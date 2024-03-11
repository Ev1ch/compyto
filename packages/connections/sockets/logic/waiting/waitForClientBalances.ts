import type { Balance } from '@/balancing/domain';

import type { Device } from '../../../domain';
import { type SocketConnection, Event } from '../../domain';
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

    client.once(Event.IDENTIFICATION, (device: Device) => {
      console.log('Connected to', device);
      const connection = createSocketConnection(client, device);
      connections.push(connection);

      console.log(
        'connections length',
        connections.length,
        'balances length',
        balances.length,
      );

      if (connections.length === balances.length) {
        callback(connections);
      }
    });

    console.log('Connecting as client to', balance.server.uri);
    client.connect();
  });
}
