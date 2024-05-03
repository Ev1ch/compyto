import { LocationOperatorArg, OperatorType, Type } from '../domain';
import { createOperator, createWorker } from './creators';

export const MAX = createOperator(OperatorType.MAX, [
  {
    type: Type.NUMBER,
    worker: createWorker((a: number, b: number) => (a > b ? a : b)),
  },
]);
export const MIN = createOperator(OperatorType.MIN, [
  {
    type: Type.NUMBER,
    worker: createWorker((a: number, b: number) => (a > b ? b : a)),
  },
]);
export const SUM = createOperator(OperatorType.SUM, [
  {
    type: Type.NUMBER,
    worker: createWorker((a: number, b: number) => a + b),
  },
]);
export const PROD = createOperator(OperatorType.PROD, [
  {
    type: Type.NUMBER,
    worker: createWorker((a: number, b: number) => a * b),
  },
]);

//- Performs a logical and across the elements.
export const LAND = createOperator(OperatorType.LAND, [
  {
    type: Type.BOOLEAN,
    worker: createWorker((a: boolean, b: boolean) => a && b),
  },
]);

//- Performs a logical OR across the elements.
export const LOR = createOperator(OperatorType.LOR, [
  {
    type: Type.BOOLEAN,
    worker: createWorker((a: boolean, b: boolean) => a || b),
  },
]);

// Performs a bitwise and across the bits of the elements.
export const BAND = createOperator(OperatorType.BAND, [
  {
    type: Type.NUMBER,
    worker: createWorker((a: number, b: number) => a & b),
  },
]);

// Performs a bitwise OR across the bits of the elements.
export const BOR = createOperator(OperatorType.BOR, [
  {
    type: Type.NUMBER,
    worker: createWorker((a: number, b: number) => a | b),
  },
]);

export const LXOR = createOperator(OperatorType.LXOR, [
  {
    type: Type.NUMBER,
    worker: createWorker((a: number, b: number) => (a || b) && !(a && b)),
  },
]);

export const BXOR = createOperator(OperatorType.BXOR, [
  {
    type: Type.NUMBER,
    worker: createWorker((a: number, b: number) => a ^ b),
  },
]);

export const MAXLOC = createOperator(OperatorType.MAXLOC, [
  {
    type: Type.OBJECT,
    worker: createWorker((a: LocationOperatorArg, b: LocationOperatorArg) =>
      a.value > b.value ? a : b,
    ),
  },
]);

export const MINLOC = createOperator(OperatorType.MINLOC, [
  {
    type: Type.OBJECT,
    worker: createWorker((a: LocationOperatorArg, b: LocationOperatorArg) =>
      a.value > b.value ? b : a,
    ),
  },
]);
