import 'dotenv/config';

import { readFile } from 'node:fs/promises';
import * as path from 'node:path';

import { createSocketCommunicator } from '@/connections/sockets/logic';

import type { Runner } from '../domain';
import { DEFAULT_SETTINGS_PATH } from '../constants';
import { SettingsSchema } from '../schemas';

export default async function createRunner(): Promise<Runner> {
  const settingsPath = path.resolve(
    process.env.SETTINGS_PATH ?? DEFAULT_SETTINGS_PATH,
  );

  const string = (await readFile(settingsPath)).toString();
  const settings = JSON.parse(string);
  await SettingsSchema.validate(settings);

  const communicator = createSocketCommunicator(settings);

  return {
    settings,
    communicator,
  };
}
