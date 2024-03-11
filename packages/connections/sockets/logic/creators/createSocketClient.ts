import { io } from 'socket.io-client';

import type { Device, URI } from '@/connections/domain';

import type { ClientSocket } from '../../domain';
import { getStringURI } from '../../../logic';

export default function createSocketClient(
  uri: URI,
  device: Device,
): ClientSocket {
  return io(getStringURI(uri), {
    autoConnect: false,
    auth: { device },
  });
}
