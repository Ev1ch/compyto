import type { MonitoringEvent } from '@compyto/monitoring';
import { get } from '@compyto/utils';

import type { MonitoringEventsSortField } from '../../domain';

export default function getMonitoringEventField(
  event: MonitoringEvent,
  field: MonitoringEventsSortField,
) {
  return get(event, field);
}
