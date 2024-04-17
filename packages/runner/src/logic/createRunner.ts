import 'dotenv/config';

import { readFile } from 'node:fs/promises';
import * as path from 'node:path';

import { createDashboard } from '@compyto/dashboard';
import { createConsoleLogger } from '@compyto/logging';
import { createMonitoring } from '@compyto/monitoring';
import { runtime } from '@compyto/runtime';
import { SettingsSchema } from '@compyto/settings';
import { createSocketCommunicator } from '@compyto/sockets';

import type { Runner } from '../domain';
import { DEFAULT_SETTINGS_PATH } from '../constants';

export default async function createRunner(): Promise<Runner> {
  const settingsPath = path.resolve(
    process.env.SETTINGS_PATH ?? DEFAULT_SETTINGS_PATH,
  );
  const string = (await readFile(settingsPath)).toString();
  const settings = JSON.parse(string);
  await SettingsSchema.validate(settings);
  const monitoring = createMonitoring(settings);
  const communicator = createSocketCommunicator(settings);
  const logger = createConsoleLogger(communicator.process);
  const dashboard = createDashboard(settings);

  runtime.settings = settings;
  runtime.monitoring = monitoring;
  runtime.logger = logger;
  runtime.dashboard = dashboard;

  monitoring.onAny(logger.event);
  await monitoring.start();
  await dashboard.start();
  await monitoring.waitForDashboard();

  return {
    settings,
    communicator,
  };
}
