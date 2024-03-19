import NodeEventsEmitter from 'events';

import type { UnknownArgs } from '@/core/domain';

import type { EventsEmitter } from '../domain';

export default function createEventsEmitter<
  TEvents extends Record<string, UnknownArgs>,
>(): EventsEmitter<TEvents> {
  return new NodeEventsEmitter();
}
