import type OperatorType from './OperatorType';
import type { UnknownArgs } from './Perform';
import type Type from './Type';

export default interface Operator<TArgs extends UnknownArgs, TValue> {
  type: OperatorType;
  allowedTypes: Type[];
  apply<TApplyArgs extends TArgs, TApplyValue extends TValue>(
    ...args: TApplyArgs
  ): TApplyValue;
}
