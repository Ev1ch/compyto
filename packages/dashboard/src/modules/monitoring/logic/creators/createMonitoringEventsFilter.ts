import { createId } from '@compyto/utils';

import type {
  MonitoringEventsFilter,
  MonitoringEventsFilterCriteria,
} from '../../domain';

export default function createMonitoringEventsFilter(
  criteria: MonitoringEventsFilterCriteria,
  value: string,
): MonitoringEventsFilter {
  return {
    id: createId(),
    criteria,
    value,
  };
}
