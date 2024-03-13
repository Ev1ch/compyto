import type { URI } from '../domain';
import { URISchema } from '../schemas';

export default function isURI(value: unknown): value is URI {
  return URISchema.isValidSync(value);
}
