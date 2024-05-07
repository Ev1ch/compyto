import type { MonitoringEventWithContext } from '@compyto/monitoring';
import { get } from '@compyto/utils';
import type { SortField } from '@/modules/sorting/domain';

export default function getMonitoringEventWithContextField(
  eventWithContext: MonitoringEventWithContext,
  field: SortField,
) {
  return get(eventWithContext, field);
}
