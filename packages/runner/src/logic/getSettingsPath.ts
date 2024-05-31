import 'dotenv/config';

import { resolve } from 'node:path';

import { DEFAULT_SETTINGS_PATH } from '../constants';

export default function getSettingsPath(customSettingsPath?: string): string {
  return resolve(
    customSettingsPath ?? process.env.SETTINGS_PATH ?? DEFAULT_SETTINGS_PATH,
  );
}
