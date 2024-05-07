import type { Id } from '@compyto/utils';

import type SortField from './SortField';
import type SortOrder from './SortOrder';

export default interface MonitoringEventsSort {
  id: Id;
  field: SortField;
  order: SortOrder;
}
