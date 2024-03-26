import type { ProcessWithData } from '@compyto/connections/domain';
import type { Queue } from '@compyto/utils/domain';

import { SocketEvent, type SocketConnection } from '../domain';

export default function setCommunicationHandlers(
  selfConnections: SocketConnection[],
  selfQueue: Queue<ProcessWithData>,
) {
  selfConnections.forEach(({ socket, device: { process } }) => {
    socket.on(SocketEvent.SEND, (data) => {
      selfQueue.enqueue({ data, process });
    });
  });
}
