import path from 'path';
import express from 'express';
import open from 'open';

import { getStringURI } from '@compyto/connections';
import { Settings } from '@compyto/settings';

// @ts-expect-error Node modules versions differ
const PUBLIC_PATH = path.resolve(import.meta.dirname, './client');

/**
 * Interface which defines the dashboard.
 * Allow us to start the tool.
 */
export interface Dashboard {
  start(): Promise<void>;
}

export function createDashboard({
  dashboard,
  monitoring,
}: Settings): Dashboard {
  const app = express();

  app.use(express.static(PUBLIC_PATH));

  app.get('/', (req, res) => {
    res.sendFile(path.join(PUBLIC_PATH, 'index.html'));
  });

  function start() {
    return new Promise<void>((resolve) => {
      const uri = `${getStringURI(dashboard.uri)}/?uri=${getStringURI(monitoring.uri)}&code=${dashboard.code}`;

      app.listen(dashboard.uri.port, () => {
        open(uri).then(() => resolve(undefined));
      });
    });
  }

  return {
    start,
  };
}
