import { Server } from 'socket.io';

import type { SocketsServer } from '../../domain';

export default function createSocketServer(): SocketsServer {
  const io = new Server({
    // Needed for big data
    maxHttpBufferSize: 1e10,
    pingTimeout: 600000,
  });

  return io;
}
