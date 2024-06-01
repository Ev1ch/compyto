import 'dotenv/config';

import { resolve } from 'node:path';

import { DEFAULT_SETTINGS_PATH } from '../constants';

/**
 * Function for getting the settings path,
 * either from the custom path, the environment variable
 * or the default path.
 */
export default function getSettingsPath(customSettingsPath?: string): string {
  return resolve(
    customSettingsPath ?? process.env.SETTINGS_PATH ?? DEFAULT_SETTINGS_PATH,
  );
}
