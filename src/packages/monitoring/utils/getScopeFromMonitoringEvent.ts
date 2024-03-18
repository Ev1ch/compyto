import type {
  MonitoringEvent,
  MonitoringEventScope,
  MonitoringEventType,
} from '../domain';
import { SCOPE_DELIMITER, TYPE_DELIMITER } from '../constants';

export default function getScopeFromMonitoringEvent<
  TMonitoringEventType extends MonitoringEventType,
  TMonitoringEventScope extends MonitoringEventScope,
  TMonitoringEventName extends string,
>(
  event: MonitoringEvent<
    TMonitoringEventType,
    TMonitoringEventScope,
    TMonitoringEventName
  >,
) {
  const [, other] = event.split(TYPE_DELIMITER);
  const [scope] = other.split(SCOPE_DELIMITER);

  return scope as TMonitoringEventScope;
}
