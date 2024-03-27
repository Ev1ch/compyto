import Perform, { UnknownArgs } from './Perform';
import type Type from './Type';

export interface WorkerWithType<TArgs extends UnknownArgs, TValue> {
  type: Type;
  worker: Worker<TArgs, TValue>;
}

/**
 * Basic entity which allows to perform
 * operator's job on different types of values.
 * {@link core/src.Operator | Operator} usually contains multiple workers
 * for different types of values.
 */
export default interface Worker<TArgs extends UnknownArgs, TValue> {
  perform: Perform<TArgs, TValue>;
}
