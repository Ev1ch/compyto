import type Code from './Code';

/**
 * Core abstraction which represents a process
 * that can communicate with other processes and
 * perform operations.
 */
export default interface Process {
  readonly code: Code;
}
