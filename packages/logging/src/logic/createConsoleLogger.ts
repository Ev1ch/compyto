import type { Logger } from '../domain';
import getColoredMonitoringContext from './getColoredMonitoringContext';
import getColoredMonitoringEventKey from './getColoredMonitoringEventKey';
import getLog from './getLog';

export default function createConsoleLogger(): Logger {
  const logContext: Logger['logContext'] = (_, context) => {
    const log = getLog(getColoredMonitoringContext(context));

    console.log(...log);
  };

  const logEvent: Logger['logEvent'] = (key, context, ...args) => {
    const log = getLog(
      getColoredMonitoringEventKey(key),
      'with arguments:',
      args,
      'and context:',
      context,
    );

    console.log(...log);
  };

  return {
    logEvent,
    logContext,
  };
}
