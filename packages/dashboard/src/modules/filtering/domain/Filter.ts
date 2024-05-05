import type { Id } from '@compyto/utils';

import type FilterCriteria from './FilterCriteria';

export default interface Filter {
  id: Id;
  criteria: FilterCriteria;
  value: string;
}
