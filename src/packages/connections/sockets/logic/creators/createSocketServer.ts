import { Server } from 'socket.io';

import type { SocketsServer } from '../../domain';

export default function createSocketServer(): SocketsServer {
  const io = new Server({});

  return io;
}
