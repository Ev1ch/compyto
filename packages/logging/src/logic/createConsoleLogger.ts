import type { Process } from '@compyto/core';

import type { Logger } from '../domain';
import getColoredMonitoringContext from './getColoredMonitoringContext';
import getColoredMonitoringEventKey from './getColoredMonitoringEventKey';
import getLog from './getLog';

export default function createConsoleLogger(process: Process): Logger {
  const event: Logger['event'] = (key, context, ...args) => {
    const log = getLog(
      getColoredMonitoringContext(process),
      getColoredMonitoringEventKey(key),
      'with arguments:',
      args,
      'and context:',
      context,
    );

    console.log(...log);
  };

  return {
    event,
  };
}
