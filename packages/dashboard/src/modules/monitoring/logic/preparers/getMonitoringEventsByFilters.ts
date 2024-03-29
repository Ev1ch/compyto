import {
  getMonitoringEventKeyParts,
  type MonitoringEvent,
} from '@compyto/monitoring';

import {
  MonitoringEventsFilterCriteria,
  type MonitoringEventsFilter,
} from '../../domain';

export default function getMonitoringEventsByFilters(
  events: MonitoringEvent[],
  filters: MonitoringEventsFilter[],
) {
  return events.filter(({ key }) => {
    return filters.every((filter) => {
      const [type, scope] = getMonitoringEventKeyParts(key);

      if (filter.criteria === MonitoringEventsFilterCriteria.TYPE) {
        return type === filter.value;
      }

      if (filter.criteria === MonitoringEventsFilterCriteria.SCOPE) {
        return scope === filter.value;
      }

      return true;
    });
  });
}
