import { FilterCriteria } from './domain';

export const FILTER_CRITERION = [
  FilterCriteria.EVENT_TYPE,
  FilterCriteria.EVENT_SCOPE,
  FilterCriteria.CONTEXT_PROCESS_CODE,
] as const;
