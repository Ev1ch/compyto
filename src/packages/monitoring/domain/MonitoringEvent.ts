import { SCOPE_DELIMITER, TYPE_DELIMITER } from '../constants';
import type MonitoringEventScope from './MonitoringEventScope';
import type MonitoringEventType from './MonitoringEventType';

/**
 * Type which represent the monitoring event structure.
 * The structure includes the type, scope and name of the event.
 * Each part of the structure is separated by the delimiter.
 */
type MonitoringEvent<
  TMonitoringEventType extends MonitoringEventType,
  TMonitoringEventScope extends MonitoringEventScope,
  TMonitoringEventName extends string,
> = `${TMonitoringEventType}${typeof TYPE_DELIMITER}${TMonitoringEventScope}${typeof SCOPE_DELIMITER}${TMonitoringEventName}`;

export default MonitoringEvent;
