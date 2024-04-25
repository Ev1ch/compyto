import type OperatorType from './OperatorType';
import type { UnknownArgs } from './Perform';
import type Type from './Type';

/**
 * Represents an operator that can be
 * applied to values in some group methods.
 */
export default interface Operator<
  TArgs extends UnknownArgs = UnknownArgs,
  TValue = unknown,
> {
  readonly type: OperatorType;
  readonly allowedTypes: Type[];
  apply<TApplyArgs extends TArgs, TApplyValue extends TValue>(
    args: TApplyArgs,
  ): TApplyValue[];
}
