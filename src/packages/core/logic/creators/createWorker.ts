import type { Perform, Worker } from '../../domain';

export default function createWorker(perform: Perform): Worker {
  return {
    perform,
  };
}
