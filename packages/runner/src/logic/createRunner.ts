import 'dotenv/config';

import { readFile } from 'node:fs/promises';
import * as path from 'node:path';
import { createSocketCommunicator } from '@compyto/connections/sockets/logic';
import logger from '@compyto/logging/logic/logger';
import { monitoring } from '@compyto/monitoring/logic';

import type { Runner } from '../domain';
import { DEFAULT_SETTINGS_PATH } from '../constants';
import { SettingsSchema } from '../schemas';

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
