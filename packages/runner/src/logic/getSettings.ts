import fs from 'node:fs/promises';

import { Settings, SettingsSchema } from '@compyto/settings';

export default async function getSettings(
  settingsPath: string,
): Promise<Settings> {
  const string = (await fs.readFile(settingsPath)).toString();
  const settings: Settings = JSON.parse(string);
  await SettingsSchema.validate(settings);
  return settings;
}
