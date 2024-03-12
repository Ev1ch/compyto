import type { Operator } from '@/core/domain';

import type { Command } from '../../domain';

export default function createCommand(
  operator: Operator,
  data: unknown,
): Command {
  return {
    operator,
    data,
  };
}
