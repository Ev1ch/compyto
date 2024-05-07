import chalk from 'chalk';

import type { MonitoringEventKeyScope } from '@compyto/monitoring';

import { Color, type Print } from './domain';

export const TYPE_TO_COLOR_MAP = {
  error: Color.RED,
  info: Color.GREEN,
  warning: Color.YELLOW,
} as const;

export const TIMESTAMP_COLOR = Color.CYAN;

export const MONITORING_CONTEXT_COLOR = Color.BLACK;

/**
 * Map of color to which allows to
 * divide color printing implementation
 * from abstract color code.
 */
export const COLOR_TO_PRINT_METHOD_MAP: Record<Color, Print> = {
  [Color.RED]: chalk.red.bold,
  [Color.GREEN]: chalk.green.bold,
  [Color.YELLOW]: chalk.yellow.bold,
  [Color.CYAN]: chalk.cyan.bold,
  [Color.BLACK]: chalk.black.bold,

  [Color.BLUE]: chalk.blue.bold,
  [Color.MAGENTA]: chalk.magenta.bold,
  [Color.GRAY]: chalk.gray.bold,
  [Color.WHITE]: chalk.white.bold,
};

export const EVENT_SCOPE_TO_COLOR_MAP: Record<MonitoringEventKeyScope, Color> =
  {
    balancing: Color.BLUE,
    runner: Color.MAGENTA,
    connections: Color.GRAY,
    monitoring: MONITORING_CONTEXT_COLOR,
  };

export const UNKNOWN_PROCESS_CODE = 'UNKNOWN';

export const DEFAULT_LOGS_PATH = 'logs.json';
