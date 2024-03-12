import { isURI } from '@/connections/logic';
import { isObject } from '@/validation/logic';

import type { SettingsMaster } from '../domain';

export default function validateSettingsMaster(
  value: unknown,
): value is SettingsMaster {
  if (!isObject(value)) {
    throw new Error('Settings master is not an object');
  }

  if (!('uri' in value) || !isURI(value.uri)) {
    throw new Error('Settings master URI is not valid');
  }

  return true;
}
