import type { Balance } from '@/balancing/domain';

import type { Device } from '../../../domain';
import { type SocketConnection, Event } from '../../domain';
import createSocketConnection from '../createSocketConnection';
import createSocketServer from '../createSocketServer';

export type WaitForServerBalancesCallback = (
  connections: SocketConnection[],
) => void;

export default function waitForServerBalances(
  balances: Balance[],
  selfDevice: Device,
  callback: WaitForServerBalancesCallback,
) {
  const io = createSocketServer();
  const connections: SocketConnection[] = [];

  io.on(Event.CONNECTION, (socket) => {
    console.log('Get a client with', socket.handshake.auth.device);
    const device = socket.handshake.auth.device as Device | undefined;

    if (!device) {
      throw new Error('No device found in the socket handshake');
    }

    const connection = createSocketConnection(socket, device);
    connections.push(connection);

    socket.emit(Event.IDENTIFICATION, selfDevice);
    console.log('Sent identification to', device);

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

  io.listen(selfDevice.uri.port);
}
