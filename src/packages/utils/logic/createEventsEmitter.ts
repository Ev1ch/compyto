import { EventEmitter } from 'node:events';

export default function createEventsEmitter<
  TEvent extends string,
  TEvents extends Record<TEvent, unknown[]>,
>() {
  return new EventEmitter<TEvents>();
}
