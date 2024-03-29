import type MonitoringEventContext from './MonitoringEventContext';
import type MonitoringEventKey from './MonitoringEventKey';

export default interface MonitoringEvent<
  TMonitoringEventKey extends MonitoringEventKey = MonitoringEventKey,
  TMonitoringEventArgs extends unknown[] = unknown[],
  TMonitoringEventContext extends
    MonitoringEventContext = MonitoringEventContext,
> {
  readonly key: TMonitoringEventKey;
  readonly args: TMonitoringEventArgs;
  readonly context: TMonitoringEventContext;
}
