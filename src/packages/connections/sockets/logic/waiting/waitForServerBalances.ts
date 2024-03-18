import type { Balance } from '@/balancing/domain';
import type { Device } from '@/connections/domain';
import { monitoring } from '@/monitoring/logic';

import { Event, type SocketConnection } from '../../domain';
import { createSocketConnection, createSocketServer } from '../creators';

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
    const device = socket.handshake.auth.device as Device | undefined;

    if (!device) {
      throw new Error('No device found in the socket handshake');
    }

    monitoring.emit('info:connections/person-as-server-got-client', device);

    const connection = createSocketConnection(socket, device);
    connections.push(connection);

    socket.emit(Event.IDENTIFICATION, selfDevice);
    monitoring.emit(
      'info:connections/person-as-server-identification-sent',
      device,
    );

    if (connections.length === balances.length) {
      callback(connections);
    }
  });

  io.listen(selfDevice.uri.port);
}
