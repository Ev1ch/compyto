import type {
  MonitoringContext,
  MonitoringEventContext,
  MonitoringEventKeys,
  MonitoringEventKeysMap,
} from '@compyto/monitoring';

/**
 * The interface which represents the logger,
 * providing the ability to log events, errors, warnings
 * and info messages. Based on {@link logging/src.Print | print}.
 */
export default interface Logger {
  logContext<TMonitoringContext extends MonitoringContext>(
    context: TMonitoringContext,
  ): void;

  logEvent<TEvent extends MonitoringEventKeys>(
    event: TEvent,
    context: MonitoringEventContext,
    ...args: MonitoringEventKeysMap[TEvent]
  ): void;
}
