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
    _: MonitoringEventContext,
    context: TMonitoringContext,
  ): void;

  logEvent<TEventKey extends MonitoringEventKeys>(
    key: TEventKey,
    context: MonitoringEventContext,
    ...args: MonitoringEventKeysMap[TEventKey]
  ): void;
}
