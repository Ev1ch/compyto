import type { Process } from '@compyto/core';

import type URI from './URI';

/**
 * Abstraction which connects core {@link core/src.Process | process}
 * with network and helps to
 * divide core and network layers.
 */
export default interface Device {
  uri: URI;
  process: Process;
}
