#!/usr/bin/env node
import type { Server } from 'node:http';
import path from 'node:path';
import express from 'express';
import open from 'open';

import { getStringURI } from '@compyto/connections';
import { getSettings } from '@compyto/runner';
import type { Settings } from '@compyto/settings';

// @ts-expect-error Node modules versions differ
const PUBLIC_PATH = path.resolve(import.meta.dirname, './client');

/**
 * Interface which defines the dashboard.
 * Allow us to start and stop the tool.
 */
export interface Dashboard {
  start(): Promise<void>;
  stop(): Promise<void>;
}

export function createDashboard(settings: Settings): Dashboard {
  if (!settings.dashboard) {
    throw new Error('Dashboard settings are required to start the dashboard.');
  }

  const {
    dashboard: { uri },
  } = settings;
  const app = express();
  let server: Server | null = null;

  app.use(express.static(PUBLIC_PATH));

  app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC_PATH, 'index.html'));
  });

  function start() {
    return new Promise<void>((resolve) => {
      server = app.listen(uri.port, () => {
        open(getStringURI(uri)).then(() => resolve(undefined));
      });
    });
  }

  function stop() {
    return new Promise<void>((resolve, reject) => {
      if (!server) {
        return reject(new Error('Server is not running.'));
      }

      server.close(() => resolve(undefined));
    });
  }

  return {
    start,
    stop,
  };
}

(async () => {
  const settings = await getSettings();
  const dashboard = createDashboard(settings);
  await dashboard.start();
})();
