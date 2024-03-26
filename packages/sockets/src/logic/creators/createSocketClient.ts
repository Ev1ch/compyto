import { io } from 'socket.io-client';

import { getStringURI, type Device, type URI } from '@compyto/connections';

import type { Socket } from '../../domain';

export default function createSocketClient(uri: URI, device: Device): Socket {
  return io(getStringURI(uri), {
    autoConnect: false,
    auth: { device },
  });
}
