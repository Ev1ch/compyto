import { isNumber, isObject } from '@/validation/logic';

import type { URI } from '../domain';

export default function isURI(value: unknown): value is URI {
  return (
    isObject(value) &&
    'port' in value &&
    'path' in value &&
    isNumber(value.port) &&
    typeof value.path === 'string'
  );
}
