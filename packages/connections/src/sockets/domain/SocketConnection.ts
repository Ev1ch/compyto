import type { Connection } from '@compyto/connections/domain';

import type Socket from './Socket';

export default interface SocketConnection extends Connection {
  readonly socket: Socket;
}
