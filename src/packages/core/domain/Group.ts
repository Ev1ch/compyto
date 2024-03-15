import type Process from './Process';

/**
 * Interface which represents a group of processes
 * and provides methods to work with them.
 */
export default interface Group {
  readonly processes: Process[];
  add(...processes: Process[]): void;
  remove(process: Process): void;
  [Symbol.iterator](): IterableIterator<Process>;
}
