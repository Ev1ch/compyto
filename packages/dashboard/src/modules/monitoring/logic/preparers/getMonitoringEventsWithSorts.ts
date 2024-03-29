import type { MonitoringEvent } from '@compyto/monitoring';

import {
  MonitoringEventsSortOrder,
  type MonitoringEventsSort,
} from '../../domain';
import getMonitoringEventField from './getMonitoringEventField';

export default function getMonitoringEventsWithSorts(
  events: MonitoringEvent[],
  sorts: MonitoringEventsSort[],
) {
  const sortedEvents = [...events];

  sorts.forEach(({ field, order }) => {
    sortedEvents.sort((a, b) => {
      const aValue = getMonitoringEventField(a, field);
      const bValue = getMonitoringEventField(b, field);

      if (aValue > bValue) {
        return order === MonitoringEventsSortOrder.DESCENDING ? 1 : -1;
      }

      if (aValue < bValue) {
        return order === MonitoringEventsSortOrder.DESCENDING ? -1 : 1;
      }

      return 0;
    });
  });

  return sortedEvents;
}
