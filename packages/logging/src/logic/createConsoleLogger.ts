import type { Process } from '@compyto/core';

import type { Color, Logger, Print } from '../domain';
import { COLOR_TO_PRINT_METHOD_MAP, TYPE_TO_COLOR_MAP } from '../constants';
import getColoredMonitoringContext from './getColoredMonitoringContext';
import getColoredMonitoringEventKey from './getColoredMonitoringEventKey';
import getLog from './getLog';

export default function createConsoleLogger(process: Process): Logger {
  function getColoredPrint(color: Color, method: Print) {
    const getColoredArgs = COLOR_TO_PRINT_METHOD_MAP[color];
    const coloredPrint: Print = (...args) => {
      const log = getLog(getColoredArgs(...args));
      method(...log);
    };

    return coloredPrint;
  }

  const info: Logger['info'] = getColoredPrint(
    TYPE_TO_COLOR_MAP.info,
    console.log,
  );

  const warn: Logger['warn'] = getColoredPrint(
    TYPE_TO_COLOR_MAP.warning,
    console.warn,
  );

  const error: Logger['error'] = getColoredPrint(
    TYPE_TO_COLOR_MAP.error,
    console.error,
  );

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
    info,
    warn,
    error,
    event,
  };
}
