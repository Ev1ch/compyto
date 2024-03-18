import type { Logger } from '../domain';
import getColoredMonitoringEvent from './getColoredMonitoringEvent';

export default function createConsoleLogger(): Logger {
  const info = console.info;
  const warn = console.warn;
  const error = console.error;

  const event: Logger['event'] = (event, ...args) => {
    console.log(getColoredMonitoringEvent(event), 'with arguments:', args);
  };

  return {
    info,
    warn,
    error,
    event,
  };
}
