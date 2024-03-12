import { Type } from '../domain';
import { createOperator, createWorker } from './creators';

export const bitwiseAnd = createOperator([
  // @ts-expect-error Argument of type...
  { type: Type.NUMBER, worker: createWorker((a: number, b: number) => a & b) },
]);
