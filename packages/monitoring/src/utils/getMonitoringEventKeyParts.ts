import type {
  MonitoringEventKey,
  MonitoringEventKeyScope,
  MonitoringEventKeyType,
} from '../domain';
import { SCOPE_DELIMITER, TYPE_DELIMITER } from '../constants';

export default function getMonitoringEventKeyParts<
  TMonitoringEventKeyType extends MonitoringEventKeyType,
  TMonitoringEventKeyScope extends MonitoringEventKeyScope,
  TMonitoringEventKeyName extends string,
>(
  event: MonitoringEventKey<
    TMonitoringEventKeyType,
    TMonitoringEventKeyScope,
    TMonitoringEventKeyName
  >,
): [
  TMonitoringEventKeyType,
  TMonitoringEventKeyScope,
  TMonitoringEventKeyName,
] {
  const [type, other] = event.split(TYPE_DELIMITER);
  const [scope, name] = other.split(SCOPE_DELIMITER);

  return [
    type as TMonitoringEventKeyType,
    scope as TMonitoringEventKeyScope,
    name as TMonitoringEventKeyName,
  ];
}
