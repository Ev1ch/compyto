import { OperatorType, Type } from '../domain';
import { createOperator, createWorker } from './creators';

export const plus = createOperator(OperatorType.PLUS, [
  { type: Type.NUMBER, worker: createWorker((a: number, b: number) => a + b) },
  { type: Type.STRING, worker: createWorker((a: string, b: string) => a + b) },
]);
