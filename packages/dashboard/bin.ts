#!/usr/bin/env node
import type { Server } from 'node:http';
import path from 'node:path';
import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import open from 'open';

import { getStringURI } from '@compyto/connections';
import { getSettings, getSettingsPath } from '@compyto/runner';
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

export function setFileRequestHeaders(contentType: string, res: Response) {
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', contentType);
}

export function getFileRequestHandler(contentType: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    req.url += '.gz';
    setFileRequestHeaders(contentType, res);
    next();
  };
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

  app.get('*.html', getFileRequestHandler('text/html'));

  app.get('*.js', getFileRequestHandler('text/javascript'));

  app.get('*.json', getFileRequestHandler('application/json'));

  app.use(express.static(PUBLIC_PATH));

  app.get('/', (req, res) => {
    setFileRequestHeaders('text/html', res);
    res.sendFile(path.join(PUBLIC_PATH, 'index.html'));
  });

  function start() {
    return new Promise<void>((resolve) => {
      const handleServerStart = () => {
        const uriString = getStringURI(uri);
        open(uriString).then(() => resolve());
      };

      server = app.listen(uri.port, handleServerStart);
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
  const settingsPath = getSettingsPath();
  const settings = await getSettings(settingsPath);
  const dashboard = createDashboard(settings);
  await dashboard.start();
})();
