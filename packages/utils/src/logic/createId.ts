import type { Id } from '../domain';

/**
 * Unified method to create unique identifiers.
 */
export default function createId(): Id {
  return Math.random().toString(16).slice(2);
}
