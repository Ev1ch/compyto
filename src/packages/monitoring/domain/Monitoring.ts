import type { EventListener } from '@/utils/domain/EventsEmitter';

import MonitoringContext from './MonitoringContext';
import MonitoringEventsMap, { MonitoringEvents } from './MonitoringEventsMap';

export default interface Monitoring {
  on<TEvent extends MonitoringEvents>(
    event: TEvent,
    listener: EventListener<
      [MonitoringContext, ...MonitoringEventsMap[TEvent]]
    >,
  ): void;

  onAny(
    listener: EventListener<
      [
        MonitoringEvents,
        MonitoringContext,
        ...MonitoringEventsMap[MonitoringEvents],
      ]
    >,
  ): void;

  off<TEvent extends MonitoringEvents>(
    event: TEvent,
    listener: EventListener<
      [MonitoringContext, ...MonitoringEventsMap[TEvent]]
    >,
  ): void;

  offAny(
    listener: EventListener<
      [
        MonitoringEvents,
        MonitoringContext,
        ...MonitoringEventsMap[MonitoringEvents],
      ]
    >,
  ): void;

  emit<TEvent extends MonitoringEvents>(
    event: TEvent,
    ...args: MonitoringEventsMap[TEvent]
  ): void;
}
