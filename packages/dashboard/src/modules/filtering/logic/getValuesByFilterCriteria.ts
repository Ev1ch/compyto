import {
  getMonitoringEventKeyParts,
  type MonitoringEventWithContext,
} from '@compyto/monitoring';

import { FilterCriteria } from '../domain';

export default function getValuesByFilterCriteria(
  eventWithContexts: MonitoringEventWithContext[],
  criteria: FilterCriteria,
) {
  switch (criteria) {
    case FilterCriteria.EVENT_TYPE:
      return eventWithContexts.map(({ event: { key } }) => {
        const [type] = getMonitoringEventKeyParts(key);
        return type;
      });

    case FilterCriteria.EVENT_SCOPE:
      return eventWithContexts.map(({ event: { key } }) => {
        const [, scope] = getMonitoringEventKeyParts(key);
        return scope;
      });

    case FilterCriteria.CONTEXT_PROCESS_CODE:
      return eventWithContexts
        .filter(({ context: { process } }) => process?.code)
        .map(({ context: { process } }) => process!.code);

    default:
      return [];
  }
}
