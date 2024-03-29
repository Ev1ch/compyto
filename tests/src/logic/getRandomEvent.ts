import { sample } from 'lodash';

import {
  MONITORING_EVENT_SCOPE,
  MONITORING_EVENT_TYPES,
  SCOPE_DELIMITER,
  TYPE_DELIMITER,
  type MonitoringEvent,
} from '@compyto/monitoring';
import { createId } from '@compyto/utils';

export default function getRandomEvent(): MonitoringEvent {
  return {
    key: `${sample(MONITORING_EVENT_TYPES)}${TYPE_DELIMITER}${sample(MONITORING_EVENT_SCOPE)}${SCOPE_DELIMITER}${Math.random()}`,
    context: {
      emittedAt: new Date(),
      id: createId(),
    },
  };
}
