import type { OperatorType } from '@compyto/core/domain';

import type { Command, Data } from '../../domain';

export default function createCommand<TData extends Data>(
  operatorType: OperatorType,
  data: TData,
): Command<TData> {
  return {
    operatorType,
    data,
  };
}
