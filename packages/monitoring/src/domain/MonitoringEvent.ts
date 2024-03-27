import { SCOPE_DELIMITER, TYPE_DELIMITER } from '../constants';
import type MonitoringEventContext from './MonitoringEventContext';
import type MonitoringEventScope from './MonitoringEventScope';
import type MonitoringEventType from './MonitoringEventType';

export interface MonitoringEventWithContext<
  TMonitoringEvent extends MonitoringEvent = MonitoringEvent,
> {
  readonly event: TMonitoringEvent;
  readonly context: MonitoringEventContext;
}

/**
 * Type which represent the monitoring event structure.
 * The structure includes the type, scope and name of the event.
 * Each part of the structure is separated by the delimiter.
 */
type MonitoringEvent<
  TMonitoringEventType extends MonitoringEventType = MonitoringEventType,
  TMonitoringEventScope extends MonitoringEventScope = MonitoringEventScope,
  TMonitoringEventName extends string = string,
> = `${TMonitoringEventType}${typeof TYPE_DELIMITER}${TMonitoringEventScope}${typeof SCOPE_DELIMITER}${TMonitoringEventName}`;

export default MonitoringEvent;
