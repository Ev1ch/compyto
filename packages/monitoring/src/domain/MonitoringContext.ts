import type { Process } from '@compyto/core';

/**
 * Represents shared monitoring context,
 * across the events.
 */
export default interface MonitoringContext {
  process?: Process;
}
