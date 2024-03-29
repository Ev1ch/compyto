import {
  getMonitoringEventKeyParts,
  type MonitoringEvent,
} from '@compyto/monitoring';

import { MonitoringEventsFilterCriteria } from '../../domain';

export default function getValuesByMonitoringEventsFilterCriteria(
  events: MonitoringEvent[],
  criteria: MonitoringEventsFilterCriteria,
) {
  if (criteria === MonitoringEventsFilterCriteria.TYPE) {
    return events.map(({ key }) => {
      const [type] = getMonitoringEventKeyParts(key);
      return type;
    });
  }

  if (criteria === MonitoringEventsFilterCriteria.SCOPE) {
    return events.map(({ key }) => {
      const [, scope] = getMonitoringEventKeyParts(key);
      return scope;
    });
  }

  return [];
}
