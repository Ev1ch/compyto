import type {
  Socket as ServerSocket,
  Server as SocketsServer,
} from 'socket.io';
import type { Socket as ClientSocket } from 'socket.io-client';

type Socket = ServerSocket | ClientSocket;

export type { SocketsServer };
export default Socket;
