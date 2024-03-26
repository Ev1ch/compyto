import type { Queue, QueueEventsMap } from '../domain';
import createEventsEmitter from './createEventsEmitter';

export default function createQueue<TValue>(): Queue<TValue> {
  const array: TValue[] = [];
  const emitter = createEventsEmitter<QueueEventsMap<TValue>>();
  const off = emitter.off.bind(emitter);
  const on = emitter.on.bind(emitter);
  const once = emitter.once.bind(emitter);

  const enqueue: Queue<TValue>['enqueue'] = (value) => {
    array.push(value);
    emitter.emit('enqueue', value);
  };

  const dequeue: Queue<TValue>['dequeue'] = () => {
    if (!array.length) {
      throw new Error('Queue is empty');
    }

    const value = array.shift()!;
    emitter.emit('dequeue', value);
    return value;
  };

  return {
    get length() {
      return array.length;
    },

    enqueue,
    dequeue,

    once,
    on,
    off,
  };
}
