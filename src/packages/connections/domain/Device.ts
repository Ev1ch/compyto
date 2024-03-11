import type { Process } from '@/core/domain';

import type URI from './URI';

export default interface Device {
  uri: URI;
  process: Process;
}
