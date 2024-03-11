import type { Queue } from '@/utils/domain';

import { Event, type SocketConnection } from '../domain';

export default function startCommunication(
  selfConnections: SocketConnection[],
  selfQueue: Queue,
) {
  selfConnections.forEach(({ socket }) => {
    socket.on(Event.SEND, (data) => {
      selfQueue.enqueue(data);
    });
  });
}
