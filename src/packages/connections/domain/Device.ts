import type { Process } from '@/core/domain';

import type URI from './URI';

/**
 * Abstraction which connects core {@link packages/core/domain/Process.Process | process}
 * with network and helps to
 * divide core and network layers.
 */
export default interface Device {
  uri: URI;
  process: Process;
}
