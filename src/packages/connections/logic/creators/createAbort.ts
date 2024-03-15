import type { Abort } from '../../domain';
import { AbortError } from '../../errors';

export default function createAbort(): Abort {
  return new (class extends AbortController {
    abort(reason?: string) {
      super.abort(new AbortError(reason));
    }
  })();
}
