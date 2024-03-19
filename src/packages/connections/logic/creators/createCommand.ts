import type { OperatorType } from '@/core/domain';

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
