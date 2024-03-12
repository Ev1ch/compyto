import type { Perform, Worker } from '../../domain';

export default function createWorker<TArgs extends unknown[], TValue>(
  perform: Perform<TArgs, TValue>,
): Worker<TArgs, TValue> {
  return {
    perform,
  };
}
