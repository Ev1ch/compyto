import { Server } from 'socket.io';

import type { ServerSocket } from '../../domain';

export default function createSocketServer(): ServerSocket {
  const io = new Server({});

  return io;
}
