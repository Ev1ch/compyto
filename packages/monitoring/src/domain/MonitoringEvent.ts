import type MonitoringEventContext from './MonitoringEventContext';
import type MonitoringEventKey from './MonitoringEventKey';

export default interface MonitoringEvent<
  TMonitoringEventKey extends MonitoringEventKey = MonitoringEventKey,
  TMonitoringEventContext extends
    MonitoringEventContext = MonitoringEventContext,
> {
  readonly key: TMonitoringEventKey;
  readonly context: TMonitoringEventContext;
}
