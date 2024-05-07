import { Socket } from 'socket.io';

import type { Code } from '@compyto/core';

export default interface Connection {
  readonly code: Code;
  readonly socket: Socket;
}
