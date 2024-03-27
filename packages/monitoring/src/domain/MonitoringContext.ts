import type { Process } from '@compyto/core';

/**
 * The core monitoring context,
 * which gave ability to provide some core shared data
 * across the monitoring process and events.
 */
export default interface MonitoringContext {
  process?: Process;
}
