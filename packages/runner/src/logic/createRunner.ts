import 'dotenv/config';

import { readFile } from 'node:fs/promises';
import * as path from 'node:path';

import { createDashboard } from '@compyto/dashboard';
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
  runtime.settings = settings;
  const communicator = createSocketCommunicator(settings);

  if (settings.monitoring) {
    runtime.monitoring = createMonitoring(settings);
    runtime.logger = createConsoleLogger(communicator.process);
    runtime.monitoring.onAny(runtime.logger!.event);
    await runtime.monitoring.start();
  }

  if (settings.dashboard) {
    if (!runtime.monitoring) {
      throw new Error(
        'Monitoring settings are required to start the dashboard.',
      );
    }

    runtime.dashboard = createDashboard(settings);
    await runtime.dashboard.start();
    await runtime.monitoring.waitForDashboard();
  }

  return {
    settings,
    communicator,
  };
}
