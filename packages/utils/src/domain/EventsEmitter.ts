import type { UnknownArgs } from '@compyto/core';

export type { EventEmitter as default } from 'node:events';

export type EventListener<TArgs extends UnknownArgs> = (...args: TArgs) => void;
