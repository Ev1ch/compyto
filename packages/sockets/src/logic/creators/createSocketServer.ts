import { Server } from 'socket.io';

import type { SocketsServer } from '../../domain';

export default function createSocketServer(): SocketsServer {
  const io = new Server({
    // Needed for big data
    maxHttpBufferSize: 1e9,
    pingTimeout: 60000,
  });

  return io;
}
