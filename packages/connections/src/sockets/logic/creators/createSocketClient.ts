import type { Device, URI } from '@compyto/connections/domain';
import { io } from 'socket.io-client';

import type { Socket } from '../../domain';
import { getStringURI } from '../../../logic';

export default function createSocketClient(uri: URI, device: Device): Socket {
  return io(getStringURI(uri), {
    autoConnect: false,
    auth: { device },
  });
}
