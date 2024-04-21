import type { ProcessWithData } from '@compyto/connections';
import type { Queue } from '@compyto/utils';

import { SocketEvent, type SocketConnection } from '../domain';

export default function setCommunicationHandlers(
  selfConnections: SocketConnection[],
  selfQueue: Queue<ProcessWithData>,
) {
  selfConnections.forEach(({ socket, device: { process } }) => {
    socket.on(SocketEvent.SEND, (data) => {
      console.log('SelfQueue DATA RECEIVED', data);

      selfQueue.enqueue({ data, process });
    });
  });
}
