import type { Operator } from '@/core/domain';

export default interface Command {
  operator: Operator;
  data: unknown;
}
