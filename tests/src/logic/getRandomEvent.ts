import { sample } from 'lodash';

import type {
  MonitoringEvent,
  MonitoringEventScope,
  MonitoringEventType,
} from '@/monitoring/domain';
import {
  MONITORING_EVENT_SCOPE,
  MONITORING_EVENT_TYPES,
  SCOPE_DELIMITER,
  TYPE_DELIMITER,
} from '@/monitoring/constants';

export default function getRandomEvent(): MonitoringEvent<
  MonitoringEventType,
  MonitoringEventScope,
  string
> {
  return `${sample(MONITORING_EVENT_TYPES)}${TYPE_DELIMITER}${sample(MONITORING_EVENT_SCOPE)}${SCOPE_DELIMITER}${Math.random()}`;
}
