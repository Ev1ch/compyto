import type {
  MonitoringEventContext,
  MonitoringEvents,
  MonitoringEventsMap,
} from '@/monitoring/domain';

import type Print from './Print';

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
