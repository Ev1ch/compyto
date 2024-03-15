import type { OperatorType } from '@/core/domain';

/**
 * This interface represents a command
 * to be executed on other peer in the network.
 */
export default interface Command {
  operatorType: OperatorType;
  data: unknown;
}
