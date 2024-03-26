import type { UnknownArgs } from '@compyto/core/domain';

export type { EventEmitter as default } from 'node:events';

export type EventListener<TArgs extends UnknownArgs> = (...args: TArgs) => void;
