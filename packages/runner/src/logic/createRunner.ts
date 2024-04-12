import 'dotenv/config';

import { readFile } from 'node:fs/promises';
import * as path from 'node:path';

import { createConsoleLogger } from '@compyto/logging';
import { createMonitoring } from '@compyto/monitoring';
import { runtime } from '@compyto/runtime';
import { Settings, SettingsSchema } from '@compyto/settings';
import { createSocketCommunicator } from '@compyto/sockets';

import type { Runner } from '../domain';
import { DEFAULT_SETTINGS_PATH } from '../constants';

export default async function createRunner(): Promise<Runner> {
  const settingsPath = path.resolve(
    process.env.SETTINGS_PATH ?? DEFAULT_SETTINGS_PATH,
  );
  const string = (await readFile(settingsPath)).toString();
  const settings: Settings = JSON.parse(string);
  await SettingsSchema.validate(settings);
  const communicator = createSocketCommunicator(settings);
  const logger = createConsoleLogger(communicator.process);

  runtime.settings = settings;
  runtime.logger = logger;

  if (settings.monitoring) {
    const monitoring = createMonitoring(settings.monitoring);
    runtime.monitoring = monitoring;
    monitoring.onAny(logger.event);
  }

  return {
    settings,
    communicator,
  };
}
