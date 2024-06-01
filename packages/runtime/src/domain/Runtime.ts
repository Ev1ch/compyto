import type { Logger } from '@compyto/logging';
import type { Monitoring } from '@compyto/monitoring';
import type { Settings } from '@compyto/settings';

/**
 * Represents the shared runtime of the application.
 */
export default interface Runtime {
  settings?: Settings;
  monitoring?: Monitoring;
  logger?: Logger;
}
