import type Process from './Process';

/**
 * Interface which represents a group of processes
 * and provides methods to work with them.
 * All communications will appear only inside of this group
 */
export default interface Group {
  readonly processes: Process[];
  readonly size: number;
  add(...processes: Process[]): void;
  remove(process: Process): void;
  [Symbol.iterator](): IterableIterator<Process>;
}
