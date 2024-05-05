import { SortOrder } from './domain';

export const SORT_FIELDS = [
  'event.key',
  'event.context.id',
  'event.context.emittedAt',
  'context.process.code',
] as const;

export const SORT_ORDERS = [SortOrder.ASCENDING, SortOrder.DESCENDING];
