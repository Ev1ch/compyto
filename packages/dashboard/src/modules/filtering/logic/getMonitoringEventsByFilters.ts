import {
  getMonitoringEventKeyParts,
  type MonitoringEventWithContext,
} from '@compyto/monitoring';

import { FilterCriteria, type Filter } from '../domain';

export default function getMonitoringEventsByFilters(
  eventWithContexts: MonitoringEventWithContext[],
  filters: Filter[],
) {
  return eventWithContexts.filter(
    ({ event: { key }, context: { process } }) => {
      return filters.every((filter) => {
        const [type, scope] = getMonitoringEventKeyParts(key);
        const value = filter.value;

        switch (filter.criteria) {
          case FilterCriteria.EVENT_TYPE:
            return type === value;

          case FilterCriteria.EVENT_SCOPE:
            return scope === value;

          case FilterCriteria.CONTEXT_PROCESS_CODE:
            return process?.code === value;

          default:
            return true;
        }
      });
    },
  );
}
