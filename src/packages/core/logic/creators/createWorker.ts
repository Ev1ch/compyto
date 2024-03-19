import type { Perform, UnknownArgs, Worker } from '../../domain';

export default function createWorker<TArgs extends UnknownArgs, TValue>(
  perform: Perform<TArgs, TValue>,
): Worker<TArgs, TValue> {
  return {
    perform,
  };
}
