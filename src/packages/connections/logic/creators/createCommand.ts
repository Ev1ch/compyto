import type { Operator } from '@/core/domain';
import { createId } from '@/utils/logic';

export default function createCommand(operator: Operator, data: unknown) {
  return {
    id: createId(),
    operator,
    data,
  };
}
