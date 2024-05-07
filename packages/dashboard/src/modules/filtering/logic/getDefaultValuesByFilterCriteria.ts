import {
  MONITORING_EVENT_SCOPES,
  MONITORING_EVENT_TYPES,
} from '@compyto/monitoring';

import { FilterCriteria } from '../domain';

export default function getDefaultValuesByFilterCriteria(
  criteria: FilterCriteria,
) {
  switch (criteria) {
    case FilterCriteria.EVENT_TYPE:
      return MONITORING_EVENT_TYPES;

    case FilterCriteria.EVENT_SCOPE:
      return MONITORING_EVENT_SCOPES;

    default:
      return [];
  }
}
