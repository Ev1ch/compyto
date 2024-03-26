import type { Device } from '@compyto/connections';

import type { Balance } from '../../domain';

export default function createBalance(client: Device, server: Device): Balance {
  return {
    client,
    server,
  };
}
