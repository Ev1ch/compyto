import Perform, { UnknownArgs } from './Perform';
import type Type from './Type';

export interface WorkerWithType<TArgs extends UnknownArgs, TValue> {
  type: Type;
  worker: Worker<TArgs, TValue>;
}

export default interface Worker<TArgs extends UnknownArgs, TValue> {
  perform: Perform<TArgs, TValue>;
}
