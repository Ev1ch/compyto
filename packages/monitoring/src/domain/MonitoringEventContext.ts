import type { Id } from '@compyto/utils';

/**
 * The context,
 * which represents the metadata of the
 * specific monitoring event.
 */
export default interface MonitoringEventContext {
  id: Id;
  emittedAt: Date;
}
