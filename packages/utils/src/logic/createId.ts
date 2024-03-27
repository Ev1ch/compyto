import type { Id } from '../domain';

export default function createId(): Id {
  return Math.random().toString(16).slice(2);
}
