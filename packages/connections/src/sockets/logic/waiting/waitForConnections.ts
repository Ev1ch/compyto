import type { Device } from '@compyto/connections/domain';
import { monitoring } from '@compyto/monitoring/logic';

import {
  SocketEvent,
  type SocketConnection,
  type SocketsServer,
} from '../../domain';
import { createSocketConnection } from '../creators';

export type WaitForConnectionsCallback = (
  connections: SocketConnection[],
) => void;

export default function waitForConnections(
  io: SocketsServer,
  codes: string[],
  callback: WaitForConnectionsCallback,
) {
  const connections: SocketConnection[] = [];

  io.on(SocketEvent.CONNECTION, (socket) => {
    const device = socket.handshake.auth.device as Device | undefined;

    if (!device) {
      throw new Error('No device found in the socket handshake');
    }

    monitoring.emit('info:connections/main-person-got-client', device);
    const {
      process: { code },
    } = device;
    if (!codes.includes(code)) {
      throw new Error(`Invalid code: ${code}`);
    }

    const connection = createSocketConnection(socket, device);
    connections.push(connection);

    if (connections.length === codes.length) {
      callback(connections);
    }
  });
}
