import type Process from './Process';

export default interface Group {
  readonly processes: Process[];
  add(...processes: Process[]): void;
  remove(process: Process): void;
  [Symbol.iterator](): IterableIterator<Process>;
}
