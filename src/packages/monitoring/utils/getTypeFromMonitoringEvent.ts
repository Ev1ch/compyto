import type {
  MonitoringEvent,
  MonitoringEventScope,
  MonitoringEventType,
} from '../domain';
import { TYPE_DELIMITER } from '../constants';

export default function getTypeFromMonitoringEvent<
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
  const [type] = event.split(TYPE_DELIMITER);

  return type as TMonitoringEventType;
}
