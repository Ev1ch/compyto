import { SCOPE_DELIMITER, TYPE_DELIMITER } from '../constants';
import type MonitoringEventKeyScope from './MonitoringEventKeyScope';
import type MonitoringEventKeyType from './MonitoringEventKeyType';

/**
 * Type which represent the monitoring event structure.
 * The structure includes the type, scope and name of the event.
 * Each part of the structure is separated by the delimiter.
 */
type MonitoringEventKey<
  TMonitoringEventKeyType extends
    MonitoringEventKeyType = MonitoringEventKeyType,
  TMonitoringEventKeyScope extends
    MonitoringEventKeyScope = MonitoringEventKeyScope,
  TMonitoringEventName extends string = string,
> = `${TMonitoringEventKeyType}${typeof TYPE_DELIMITER}${TMonitoringEventKeyScope}${typeof SCOPE_DELIMITER}${TMonitoringEventName}`;

export default MonitoringEventKey;
