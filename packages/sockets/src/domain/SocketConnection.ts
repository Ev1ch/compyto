import type { Connection } from '@compyto/connections';

import type Socket from './Socket';

export default interface SocketConnection extends Connection {
  readonly socket: Socket;
}
