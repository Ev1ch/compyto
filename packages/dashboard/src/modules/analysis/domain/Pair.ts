import type { MonitoringEvent } from '@compyto/monitoring';
import type { Id } from '@compyto/utils';

export default interface Pair {
  readonly id: Id;
  readonly events: MonitoringEvent[];
}
