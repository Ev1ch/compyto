export type QueueEvent = 'enqueue' | 'dequeue';

export interface QueueEvents<TValue> {
  enqueue: [TValue];
  dequeue: [TValue];
}

export type QueueCallback<TValue> = (value: TValue) => void;

export default interface Queue<TValue> {
  enqueue(value: TValue): void;
  dequeue(): TValue;
  readonly length: number;
  addListener(event: QueueEvent, callback: QueueCallback<TValue>): void;
  removeListener(event: QueueEvent, callback: QueueCallback<TValue>): void;
  removeAllListeners(event: QueueEvent): void;
}
