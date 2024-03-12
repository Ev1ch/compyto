import { randomUUID } from 'crypto';

import type { Id } from '../domain';

export default function createId(): Id {
  return randomUUID();
}
