import type Code from './Code';
import Rank from './Rank';

/**
 * Core abstraction which represents a process
 * that can communicate with other processes and
 * perform operations.
 */
export default interface Process {
  readonly code: Code;
  readonly rank: Rank;
}
