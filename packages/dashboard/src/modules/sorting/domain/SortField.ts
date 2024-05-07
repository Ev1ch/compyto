type SortField =
  | 'event.key'
  | 'event.context.emittedAt'
  | 'event.context.id'
  | 'context.process.code';

export default SortField;
