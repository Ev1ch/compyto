import type { OperatorType } from '@/core/domain';

import type { Command } from '../../domain';

export default function createCommand(
  operatorType: OperatorType,
  data: unknown,
): Command {
  return {
    operatorType,
    data,
  };
}
