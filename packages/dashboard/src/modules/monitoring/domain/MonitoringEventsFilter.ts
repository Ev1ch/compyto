import type { Id } from '@compyto/utils';

import type MonitoringEventsFilterCriteria from './MonitoringEventsFilterCriteria';

export default interface MonitoringEventsFilter {
  id: Id;
  criteria: MonitoringEventsFilterCriteria;
  value: string;
}
