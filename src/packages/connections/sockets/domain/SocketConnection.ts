import type { Connection } from '@/connections/domain';

import type Socket from './Socket';

export default interface SocketConnection extends Connection {
  readonly socket: Socket;
}
