export type QueueCallback<TValue> = (value: TValue) => void;

export default interface Queue<TValue> {
  enqueue(value: TValue): void;
  onEnqueue(callback: QueueCallback<TValue>): void;
  dequeue(): TValue;
  onDequeue(callback: QueueCallback<TValue>): void;
  readonly length: number;
}
