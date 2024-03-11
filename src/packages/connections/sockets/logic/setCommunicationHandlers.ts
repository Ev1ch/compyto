import type { Queue } from '@/utils/domain';

import { Event, type SocketConnection } from '../domain';

export default function setCommunicationHandlers(
  selfConnections: SocketConnection[],
  selfQueue: Queue<unknown>,
) {
  selfConnections.forEach(({ socket }) => {
    socket.on(Event.SEND, (data) => {
      selfQueue.enqueue(data);
    });
  });
}
