import path from 'path';
import express from 'express';

import { URI } from '@compyto/connections';

// @ts-expect-error Node modules versions differ
const PUBLIC_PATH = path.resolve(import.meta.dirname, './client');

export default function createDashboardServer({ port }: URI) {
  const app = express();

  app.use(express.static(PUBLIC_PATH));

  app.listen(port);
}
