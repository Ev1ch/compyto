import { createId } from '@compyto/utils';

import type { Filter, FilterCriteria } from '../../domain';

export default function createFilter(
  criteria: FilterCriteria,
  value: string,
): Filter {
  return {
    id: createId(),
    criteria,
    value,
  };
}
