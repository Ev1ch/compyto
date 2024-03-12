import { isObject } from '@/validation/logic';

import type { Process } from '../domain';
import isCode from './isCode';

export default function isProcess(value: unknown): value is Process {
  return isObject(value) && 'code' in value && isCode(value.code);
}
