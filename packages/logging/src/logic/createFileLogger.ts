import fs from 'node:fs';
import path from 'node:path';

import type { MonitoringContext, MonitoringEvent } from '@compyto/monitoring';

import type { Logger } from '../domain';
import { DEFAULT_LOGS_PATH } from '../constants';

interface Logs {
  context?: MonitoringContext;
  events?: MonitoringEvent[];
}

export default function createFileLogger(filename?: string): Logger {
  const logs: Logs = {};
  const logsPath = path.resolve(filename || DEFAULT_LOGS_PATH);

  const writeLogs = () => {
    fs.writeFileSync(logsPath, JSON.stringify(logs));
  };

  const logContext: Logger['logContext'] = (_, context) => {
    logs.context = context;
    writeLogs();
  };

  const logEvent: Logger['logEvent'] = (key, context, ...args) => {
    logs.events = logs.events ?? [];
    logs.events.push({
      key,
      context,
      args,
    });
    writeLogs();
  };

  return {
    logEvent,
    logContext,
  };
}
