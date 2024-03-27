import { sample } from 'lodash';

import {
  MONITORING_EVENT_SCOPE,
  MONITORING_EVENT_TYPES,
  SCOPE_DELIMITER,
  TYPE_DELIMITER,
  type MonitoringEvent,
  type MonitoringEventScope,
  type MonitoringEventType,
} from '@compyto/monitoring';

export default function getRandomEvent(): MonitoringEvent<
  MonitoringEventType,
  MonitoringEventScope,
  string
> {
  return `${sample(MONITORING_EVENT_TYPES)}${TYPE_DELIMITER}${sample(MONITORING_EVENT_SCOPE)}${SCOPE_DELIMITER}${Math.random()}`;
}
