import type { Queue, QueueCallback } from '../domain';

export default function createQueue<TValue>(): Queue<TValue> {
  const queue: TValue[] = [];
  const enqueueCallbacks: QueueCallback<TValue>[] = [];
  const dequeueCallbacks: QueueCallback<TValue>[] = [];

  return {
    enqueue(value: TValue) {
      queue.push(value);
      enqueueCallbacks.forEach((callback) => callback(value));
    },
    onEnqueue(callback: (value: TValue) => void) {
      enqueueCallbacks.push(callback);
    },
    dequeue() {
      if (this.length === 0) {
        throw new Error('Queue is empty');
      }

      const value = queue.shift()!;
      dequeueCallbacks.forEach((callback) => callback(value));
      return value;
    },
    onDequeue(callback: (value: TValue) => void) {
      dequeueCallbacks.push(callback);
    },
    get length() {
      return queue.length;
    },
  };
}
