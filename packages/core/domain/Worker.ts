import type Perform from './Perform';
import type Type from './Type';

export interface WorkerWithType {
  type: Type;
  worker: Worker;
}

export default interface Worker {
  perform: Perform;
}
