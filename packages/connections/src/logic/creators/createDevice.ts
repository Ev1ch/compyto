import type { Process } from '@compyto/core';

import type { Device, URI } from '../../domain';

export default function createDevice(uri: URI, process: Process): Device {
  return {
    uri,
    process,
  };
}
