import type { Server } from 'socket.io';
import type { Socket } from 'socket.io-client';

import type Connection from '../../domain/Connection';

export default interface SocketConnection extends Connection {
  socket: Server | Socket;
}
