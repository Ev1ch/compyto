export type { EventEmitter as default } from 'node:events';

export type EventListener<TArgs extends unknown[]> = (...args: TArgs) => void;
