import { Server } from 'http';
import path from 'path';
import express from 'express';
import open from 'open';

import { getStringURI } from '@compyto/connections';
import { Settings } from '@compyto/settings';

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

  if (!settings.monitoring) {
    throw new Error('Monitoring settings are required to start the dashboard.');
  }

  const { dashboard, monitoring } = settings;
  const app = express();
  let server: Server | null = null;

  app.use(express.static(PUBLIC_PATH));

  app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC_PATH, 'index.html'));
  });

  function start() {
    return new Promise<void>((resolve) => {
      const uri = `${getStringURI(dashboard.uri)}/?uri=${getStringURI(monitoring.uri)}&code=${dashboard.code}`;

      server = app.listen(dashboard.uri.port, () => {
        open(uri).then(() => resolve(undefined));
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
