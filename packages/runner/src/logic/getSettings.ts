import 'dotenv/config';

import fs from 'node:fs/promises';
import path from 'node:path';

import { Settings, SettingsSchema } from '@compyto/settings';

import { DEFAULT_SETTINGS_PATH } from '../constants';

export default async function getSettings(): Promise<Settings> {
  const settingsPath = path.resolve(
    process.env.SETTINGS_PATH ?? DEFAULT_SETTINGS_PATH,
  );
  const string = (await fs.readFile(settingsPath)).toString();
  const settings: Settings = JSON.parse(string);
  await SettingsSchema.validate(settings);
  return settings;
}
