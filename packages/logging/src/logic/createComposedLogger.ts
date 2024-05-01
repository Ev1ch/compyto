import type { Logger } from '../domain';

export default function createComposedLogger(...loggers: Logger[]): Logger {
  const logContext: Logger['logContext'] = (context) => {
    loggers.forEach((logger) => logger.logContext(context));
  };

  const logEvent: Logger['logEvent'] = (key, context, ...args) => {
    loggers.forEach((logger) => logger.logEvent(key, context, ...args));
  };

  return {
    logEvent,
    logContext,
  };
}
