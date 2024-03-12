import type { Code } from '../domain';

export default function isCode(value: unknown): value is Code {
  return typeof value === 'string';
}
