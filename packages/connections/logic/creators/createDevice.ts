import type { Process } from '@/core/domain';

import type { Device, URI } from '../../domain';

export default function createDevice(uri: URI, process: Process): Device {
  return {
    uri,
    process,
  };
}
