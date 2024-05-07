import type { Filter } from '@/modules/filtering/domain';
import type { Sort } from '@/modules/sorting/domain';

export default interface MonitoringEventsPreparers {
  search: string;
  filters: Filter[];
  sorts: Sort[];
}
