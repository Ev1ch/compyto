import type { Device } from '@/connections/domain';

import { Event, type ServerSocket, type SocketConnection } from '../../domain';
import { createSocketConnection } from '../creators';

export type WaitForConnectionsCallback = (
  connections: SocketConnection[],
) => void;

export default function waitForConnections(
  io: ServerSocket,
  codes: string[],
  callback: WaitForConnectionsCallback,
) {
  const connections: SocketConnection[] = [];

  io.on(Event.CONNECTION, (socket) => {
    const device = socket.handshake.auth.device as Device | undefined;

    if (!device) {
      throw new Error('No device found in the socket handshake');
    }

    console.log('Get the client with URI', device.uri);
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
