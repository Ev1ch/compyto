import NodeEventsEmitter from 'node:events';

import type { UnknownArgs } from '@compyto/core';

import type { EventsEmitter } from '../domain';

export default function createEventsEmitter<
  TEvents extends Record<string, UnknownArgs>,
>(): EventsEmitter<TEvents> {
  return new NodeEventsEmitter();
}
