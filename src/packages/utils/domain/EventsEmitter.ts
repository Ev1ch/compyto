import type { UnknownArgs } from '@/core/domain';

export type { EventEmitter as default } from 'node:events';

export type EventListener<TArgs extends UnknownArgs[]> = (
  ...args: TArgs
) => void;
