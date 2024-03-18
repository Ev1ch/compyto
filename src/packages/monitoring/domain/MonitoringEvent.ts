import { SCOPE_DELIMITER, TYPE_DELIMITER } from '../constants';
import type MonitoringEventScope from './MonitoringEventScope';
import type MonitoringEventType from './MonitoringEventType';

type MonitoringEvent<
  TMonitoringEventType extends MonitoringEventType,
  TMonitoringEventScope extends MonitoringEventScope,
  TMonitoringEventName extends string,
> = `${TMonitoringEventType}${typeof TYPE_DELIMITER}${TMonitoringEventScope}${typeof SCOPE_DELIMITER}${TMonitoringEventName}`;

export default MonitoringEvent;
