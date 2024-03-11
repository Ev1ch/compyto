import { type Device, State } from '../../../domain';
import type { Socket, SocketConnection } from '../../domain';

export default function createSocketConnection(
  socket: Socket,
  device: Device,
): SocketConnection {
  return {
    socket,
    device,
    state: State.CONNECTED,
  };
}
