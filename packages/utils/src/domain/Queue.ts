import type { EventListener } from './EventsEmitter';

export type QueueEventsMap<TValue> = {
  enqueue: [TValue];
  dequeue: [TValue];
};

/**
 * Represents a queue data structure.
 * Implement core methods to work with queue and
 * provides event listeners to track changes.
 */
export default interface Queue<TValue> {
  readonly length: number;

  enqueue(value: TValue): void;
  dequeue(): TValue;

  once<TEvent extends keyof QueueEventsMap<TValue>>(
    event: TEvent,
    callback: EventListener<QueueEventsMap<TValue>[TEvent]>,
  ): void;
  on<TEvent extends keyof QueueEventsMap<TValue>>(
    event: TEvent,
    callback: EventListener<QueueEventsMap<TValue>[TEvent]>,
  ): void;
  off<TEvent extends keyof QueueEventsMap<TValue>>(
    event: TEvent,
    callback: EventListener<QueueEventsMap<TValue>[TEvent]>,
  ): void;
}
