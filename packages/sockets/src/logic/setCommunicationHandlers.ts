import type { ProcessWithData } from '@compyto/connections';
import { runtime } from '@compyto/runtime';
import type { Queue } from '@compyto/utils';

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
  runtime.monitoring?.emit('info:connections/communication-handlers-set');
}
