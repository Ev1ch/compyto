import 'dotenv/config';

import { readFile } from 'node:fs/promises';
import * as path from 'node:path';

import { logger } from '@compyto/logging';
import { monitoring } from '@compyto/monitoring';
import { SettingsSchema } from '@compyto/settings';
import { createSocketCommunicator } from '@compyto/sockets';

import type { Runner } from '../domain';
import { DEFAULT_SETTINGS_PATH } from '../constants';

export default async function createRunner(): Promise<Runner> {
  monitoring.onAny(logger.event);

  const settingsPath = path.resolve(
    process.env.SETTINGS_PATH ?? DEFAULT_SETTINGS_PATH,
  );
  monitoring.emit('info:runner/settings-path-resolved', settingsPath);

  const string = (await readFile(settingsPath)).toString();
  monitoring.emit('info:runner/settings-file-read', string);
  const settings = JSON.parse(string);
  monitoring.emit('info:runner/settings-file-parsed', string);
  await SettingsSchema.validate(settings);
  monitoring.emit('info:runner/settings-validated');

  const communicator = createSocketCommunicator(settings);

  return {
    settings,
    communicator,
  };
}
