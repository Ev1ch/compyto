import { createId } from '@compyto/utils';

import type {
  MonitoringEventsSort,
  MonitoringEventsSortField,
  MonitoringEventsSortOrder,
} from '../../domain';

export default function createMonitoringEventsSort(
  field: MonitoringEventsSortField,
  order: MonitoringEventsSortOrder,
): MonitoringEventsSort {
  return {
    id: createId(),
    field,
    order,
  };
}
