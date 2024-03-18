import type { EventListener } from '@/utils/domain/EventsEmitter';

import MonitoringEventsMap, { MonitoringEvents } from './MonitoringEventsMap';

export default interface Monitoring {
  on<TEvent extends MonitoringEvents>(
    event: TEvent,
    listener: EventListener<MonitoringEventsMap[TEvent]>,
  ): void;

  onAny(
    listener: EventListener<
      [MonitoringEvents, ...MonitoringEventsMap[MonitoringEvents]]
    >,
  ): void;

  off<TEvent extends MonitoringEvents>(
    event: TEvent,
    listener: EventListener<MonitoringEventsMap[TEvent]>,
  ): void;

  offAny(
    listener: EventListener<
      [MonitoringEvents, ...MonitoringEventsMap[MonitoringEvents]]
    >,
  ): void;

  emit<TEvent extends MonitoringEvents>(
    event: TEvent,
    ...args: MonitoringEventsMap[TEvent]
  ): void;
}
