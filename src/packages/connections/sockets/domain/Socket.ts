import type { Server as ServerSocket } from 'socket.io';
import type { Socket as ClientSocket } from 'socket.io-client';

type Socket = ClientSocket | ServerSocket;

export type { ClientSocket, ServerSocket };
export default Socket;
