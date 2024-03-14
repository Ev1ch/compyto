import type { Abort } from '../../domain';

export default function createAbort(): Abort {
  return new AbortController();
}
