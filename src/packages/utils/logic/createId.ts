import { randomUUID } from 'crypto';

export default function createId() {
  return randomUUID();
}
