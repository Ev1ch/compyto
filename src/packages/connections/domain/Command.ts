import type { OperatorType } from '@/core/domain';

export default interface Command {
  operatorType: OperatorType;
  data: unknown;
}
