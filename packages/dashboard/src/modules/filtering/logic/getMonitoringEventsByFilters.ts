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
        const code = process?.code;

        switch (filter.criteria) {
          case FilterCriteria.EVENT_TYPE:
            return value.includes(type);

          case FilterCriteria.EVENT_SCOPE:
            return value.includes(scope);

          case FilterCriteria.CONTEXT_PROCESS_CODE:
            return code && value.includes(code);

          default:
            return false;
        }
      });
    },
  );
}
