export type QueueEvent = 'enqueue' | 'dequeue';

export interface QueueEvents<TValue> {
  enqueue: [TValue];
  dequeue: [TValue];
}

export type QueueCallback<TValue> = (value: TValue) => void;

/**
 * Represents a queue data structure.
 * Implement core methods to work with queue and
 * provides event listeners to track changes.
 */
export default interface Queue<TValue> {
  enqueue(value: TValue): void;
  dequeue(): TValue;
  readonly length: number;
  once(event: QueueEvent, callback: QueueCallback<TValue>): void;
  addListener(event: QueueEvent, callback: QueueCallback<TValue>): void;
  removeListener(event: QueueEvent, callback: QueueCallback<TValue>): void;
  removeAllListeners(event: QueueEvent): void;
}
