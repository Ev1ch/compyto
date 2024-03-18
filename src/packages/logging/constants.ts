import chalk from 'chalk';

import { MonitoringEventScope } from '@/monitoring/domain';

import { Color, type Print } from './domain';

export const COLOR_TO_PRINT_METHOD_MAP: Record<Color, Print> = {
  [Color.RED]: chalk.red.bold,
  [Color.GREEN]: chalk.green.bold,
  [Color.YELLOW]: chalk.yellow.bold,
  [Color.CYAN]: chalk.cyan.bold,

  [Color.BLUE]: chalk.blue.bold,
  [Color.MAGENTA]: chalk.magenta.bold,
  [Color.WHITE]: chalk.white.bold,
  [Color.BLACK]: chalk.black.bold,
};

export const TYPE_TO_COLOR_MAP = {
  error: Color.RED,
  info: Color.GREEN,
  warning: Color.YELLOW,
};

export const TIMESTAMP_COLOR = Color.CYAN;

export const EVENT_SCOPE_TO_COLOR_MAP: Record<MonitoringEventScope, Color> = {
  balancing: Color.BLUE,
  runner: Color.MAGENTA,
  connections: Color.WHITE,
};
