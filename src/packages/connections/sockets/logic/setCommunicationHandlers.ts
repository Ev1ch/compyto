import type { ProcessWithData } from '@/connections/domain';
import type { Queue } from '@/utils/domain';

import { Event, type SocketConnection } from '../domain';

export default function setCommunicationHandlers(
  selfConnections: SocketConnection[],
  selfQueue: Queue<ProcessWithData>,
) {
  selfConnections.forEach(({ socket, device: { process } }) => {
    socket.on(Event.SEND, (data) => {
      selfQueue.enqueue({ data, process });
    });
  });
}
