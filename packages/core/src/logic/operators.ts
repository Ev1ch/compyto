import { OperatorType, Rank, Type } from '../domain';
import { createOperator, createWorker } from './creators';

const max = createOperator(OperatorType.MAX, [
  {
    type: Type.NUMBER,
    worker: createWorker((a: number, b: number) => (a > b ? a : b)),
  },
]);
const min = createOperator(OperatorType.MIN, [
  {
    type: Type.NUMBER,
    worker: createWorker((a: number, b: number) => (a > b ? b : a)),
  },
]);
const sum = createOperator(OperatorType.SUM, [
  {
    type: Type.NUMBER,
    worker: createWorker((a: number, b: number) => a + b),
  },
]);
const prod = createOperator(OperatorType.PROD, [
  {
    type: Type.NUMBER,
    worker: createWorker((a: number, b: number) => a * b),
  },
]);

//- Performs a logical and across the elements.
const land = createOperator(OperatorType.LAND, [
  {
    type: Type.BOOLEAN,
    worker: createWorker((a: boolean, b: boolean) => a && b),
  },
]);

//- Performs a logical OR across the elements.
const lor = createOperator(OperatorType.LOR, [
  {
    type: Type.BOOLEAN,
    worker: createWorker((a: boolean, b: boolean) => a || b),
  },
]);

// Performs a bitwise and across the bits of the elements.
const band = createOperator(OperatorType.BAND, [
  {
    type: Type.NUMBER,
    worker: createWorker((a: number, b: number) => a & b),
  },
]);

// Performs a bitwise OR across the bits of the elements.
const bor = createOperator(OperatorType.BOR, [
  {
    type: Type.NUMBER,
    worker: createWorker((a: number, b: number) => a | b),
  },
]);

const lxor = createOperator(OperatorType.LXOR, [
  {
    type: Type.NUMBER,
    worker: createWorker((a: number, b: number) => (a || b) && !(a && b)),
  },
]);

const bxor = createOperator(OperatorType.BXOR, [
  {
    type: Type.NUMBER,
    worker: createWorker((a: number, b: number) => a ^ b),
  },
]);

interface IMaxlocObj {
  rank: Rank;
  value: number;
}

const maxloc = createOperator(OperatorType.MAXLOC, [
  {
    type: Type.OBJECT,
    worker: createWorker((a: IMaxlocObj, b: IMaxlocObj) =>
      a.value > b.value ? a : b,
    ),
  },
]);

const minloc = createOperator(OperatorType.MINLOC, [
  {
    type: Type.OBJECT,
    worker: createWorker((a: IMaxlocObj, b: IMaxlocObj) =>
      a.value > b.value ? b : a,
    ),
  },
]);

export default {
  MAX: max,
  MIN: min,
  SUM: sum,
  PROD: prod,
  LAND: land,
  LOR: lor,
  LXOR: lxor,
  BAND: band,
  BOR: bor,
  BXOR: bxor,
  MAXLOC: maxloc,
  MINLOC: minloc,
};
