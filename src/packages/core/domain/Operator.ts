import type Type from './Type';

export default interface Operator {
  types: Type[];
  apply(value: unknown): unknown;
}
