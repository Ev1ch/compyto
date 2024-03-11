import type { Perform } from '../../domain';

export default function createWorker(perform: Perform) {
  return {
    perform,
  };
}
