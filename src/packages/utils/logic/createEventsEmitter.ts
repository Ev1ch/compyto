import EventEmitter from 'node:events';

import type { EventsEmitter } from '../domain';

export default function createEventsEmitter<
  TEvents extends Record<string, unknown[]>,
>(): EventsEmitter<TEvents> {
  return new EventEmitter<TEvents>();
}
