import type {
  MonitoringEventContext,
  MonitoringEvents,
  MonitoringEventsMap,
} from '@/monitoring/domain';

import type Print from './Print';

/**
 * The interface which represents the logger,
 * providing the ability to log events, errors, warnings
 * and info messages. Based on {@link packages/logging/domain/Print.Print | print}.
 */
export default interface Logger {
  event<TEvent extends MonitoringEvents>(
    event: TEvent,
    context: MonitoringEventContext,
    ...args: MonitoringEventsMap[TEvent]
  ): void;

  error: Print;
  info: Print;
  warn: Print;
}
