import type { Queue, QueueEvent, QueueEvents } from '../domain';
import createEventsEmitter from './createEventsEmitter';

export default function createQueue<TValue>(): Queue<TValue> {
  const array: TValue[] = [];
  const emitter = createEventsEmitter<QueueEvent, QueueEvents<TValue>>();
  const addListener = emitter.addListener.bind(emitter);
  const removeListener = emitter.removeListener.bind(emitter);
  const removeAllListeners = emitter.removeAllListeners.bind(emitter);

  function enqueue(value: TValue) {
    array.push(value);
    emitter.emit('enqueue', value);
  }

  function dequeue() {
    if (!array.length) {
      throw new Error('Queue is empty');
    }

    const value = array.shift()!;
    emitter.emit('dequeue', value);
    return value;
  }

  return {
    enqueue,
    dequeue,
    addListener,
    removeListener,
    removeAllListeners,
    get length() {
      return array.length;
    },
  };
}
