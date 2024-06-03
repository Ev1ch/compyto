import {
  createComposedLogger,
  createConsoleLogger,
  createFileLogger,
} from '@compyto/logging';
import { createMonitoring } from '@compyto/monitoring';
import { runtime } from '@compyto/runtime';
import { createSocketCommunicator } from '@compyto/sockets';

import type { Runner } from '../domain';
import getSettings from './getSettings';
import getSettingsPath from './getSettingsPath';

export default async function createRunner(
  customSettingsPath?: string,
): Promise<Runner> {
  const settingsPath = getSettingsPath(customSettingsPath);
  const settings = await getSettings(settingsPath);
  runtime.settings = settings;
  const communicator = createSocketCommunicator(settings);

  if (settings.monitoring) {
    const monitoring = createMonitoring(settings);
    const consoleLogger = createConsoleLogger();
    const fileLogger = createFileLogger(settings.monitoring?.filename);
    const logger = createComposedLogger(consoleLogger, fileLogger);
    monitoring.onAny(logger.logEvent);
    monitoring.on('info:monitoring/context-set', logger.logContext);

    runtime.monitoring = monitoring;
    runtime.logger = logger;

    await monitoring.start();
  }

  return {
    settings,
    communicator,
  };
}
