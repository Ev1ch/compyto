import type { Id } from '@compyto/utils/domain';

/**
 * The context,
 * which represents the metadata of the
 * specific monitoring event. In comparison with
 * the {@link packages/monitoring/domain/MonitoringContext.MonitoringContext | monitoring context}, this context is specific to
 * each event.
 */
export default interface MonitoringEventContext {
  id: Id;
  emittedAt: Date;
}
