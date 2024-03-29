import type { Id } from '@compyto/utils';

import type MonitoringEventsSortField from './MonitoringEventsSortField';
import type MonitoringEventsSortOrder from './MonitoringEventsSortOrder';

export default interface MonitoringEventsSort {
  id: Id;
  field: MonitoringEventsSortField;
  order: MonitoringEventsSortOrder;
}
