import type { MonitoringEventWithContext } from '@compyto/monitoring';
import { getMonitoringEventField } from '@/modules/monitoring/logic';

import { SortOrder, type Sort } from '../domain';

export default function getMonitoringEventsWithSorts(
  events: MonitoringEventWithContext[],
  sorts: Sort[],
) {
  const sortedEvents = [...events];

  sorts.forEach(({ field, order }) => {
    sortedEvents.sort((a, b) => {
      const aValue = getMonitoringEventField(a, field);
      const bValue = getMonitoringEventField(b, field);

      if (typeof aValue !== 'undefined' && typeof bValue !== 'undefined') {
        if (aValue > bValue) {
          return order === SortOrder.DESCENDING ? 1 : -1;
        }

        if (aValue < bValue) {
          return order === SortOrder.DESCENDING ? -1 : 1;
        }
      }

      return 0;
    });
  });

  return sortedEvents;
}
