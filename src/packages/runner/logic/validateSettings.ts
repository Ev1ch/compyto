import { isURI } from '@/connections/logic';
import { isCode, isProcess } from '@/core/logic';
import { isObject } from '@/validation/logic';

import type { Settings } from '../domain';
import validateSettingsMaster from './validateSettingsMaster';

export default function validateSettings(
  settings: unknown,
): settings is Settings {
  if (!isObject(settings)) {
    throw new Error('Settings is not an object');
  }

  if (!('code' in settings) || !isCode(settings.code)) {
    throw new Error('Settings code is not valid');
  }

  if (!('uri' in settings) || !isURI(settings.uri)) {
    throw new Error('Settings URI is not valid');
  }

  if ('master' in settings) {
    validateSettingsMaster(settings.master);

    if ('isMaster' in settings && settings.isMaster) {
      throw new Error(
        'Settings "isMaster" key is present with "master" is not valid',
      );
    }
  } else {
    if (!('isMaster' in settings) || !settings.isMaster) {
      throw new Error('Settings "isMaster" key is not present or is not true');
    }

    if (!('clients' in settings) || !Array.isArray(settings.clients)) {
      throw new Error('Settings clients is not an array');
    }

    for (const client of settings.clients) {
      if (!isProcess(client)) {
        throw new Error(`Settings client is not valid: ${client}`);
      }
    }
  }

  return true;
}
