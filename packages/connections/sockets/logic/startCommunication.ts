import type { Queue } from '@/utils/domain';

import { SocketConnection, Event } from '../domain';

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
