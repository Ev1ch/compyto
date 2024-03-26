import type {
  MonitoringEvent,
  MonitoringEventScope,
  MonitoringEventType,
} from '../domain';
import { SCOPE_DELIMITER, TYPE_DELIMITER } from '../constants';

export default function getMonitoringEventParts<
  TMonitoringEventType extends MonitoringEventType,
  TMonitoringEventScope extends MonitoringEventScope,
  TMonitoringEventName extends string,
>(
  event: MonitoringEvent<
    TMonitoringEventType,
    TMonitoringEventScope,
    TMonitoringEventName
  >,
): [TMonitoringEventType, TMonitoringEventScope, TMonitoringEventName] {
  const [type, other] = event.split(TYPE_DELIMITER);
  const [scope, name] = other.split(SCOPE_DELIMITER);

  return [
    type as TMonitoringEventType,
    scope as TMonitoringEventScope,
    name as TMonitoringEventName,
  ];
}
