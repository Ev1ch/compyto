import { createId } from '@compyto/utils';

import type { Sort, SortField, SortOrder } from '../../domain';

export default function createSort(field: SortField, order: SortOrder): Sort {
  return {
    id: createId(),
    field,
    order,
  };
}
