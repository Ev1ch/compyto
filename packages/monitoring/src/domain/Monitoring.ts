import type { EventListener } from '@compyto/utils/domain/EventsEmitter';

import type MonitoringContext from './MonitoringContext';
import type MonitoringEventContext from './MonitoringEventContext';
import MonitoringEventsMap, { MonitoringEvents } from './MonitoringEventsMap';

export default interface Monitoring {
  context: MonitoringContext;

  on<TEvent extends MonitoringEvents>(
    event: TEvent,
    listener: EventListener<
      [MonitoringEventContext, ...MonitoringEventsMap[TEvent]]
    >,
  ): void;

  onAny(
    listener: EventListener<
      [
        MonitoringEvents,
        MonitoringEventContext,
        ...MonitoringEventsMap[MonitoringEvents],
      ]
    >,
  ): void;

  off<TEvent extends MonitoringEvents>(
    event: TEvent,
    listener: EventListener<
      [MonitoringEventContext, ...MonitoringEventsMap[TEvent]]
    >,
  ): void;

  offAny(
    listener: EventListener<
      [
        MonitoringEvents,
        MonitoringEventContext,
        ...MonitoringEventsMap[MonitoringEvents],
      ]
    >,
  ): void;

  emit<TEvent extends MonitoringEvents>(
    event: TEvent,
    ...args: MonitoringEventsMap[TEvent]
  ): void;
}
