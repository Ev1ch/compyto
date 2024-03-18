import chalk from 'chalk';

import { MonitoringEventScope, MonitoringEventType } from '@/monitoring/domain';

import { Color, type Print } from './domain';

export const COLOR_TO_PRINT_METHOD_MAP: Record<Color, Print> = {
  [Color.RED]: chalk.red,
  [Color.GREEN]: chalk.green,
  [Color.YELLOW]: chalk.yellow,

  [Color.BLUE]: chalk.blue,
  [Color.MAGENTA]: chalk.magenta,
  [Color.CYAN]: chalk.cyan,
  [Color.WHITE]: chalk.white,
  [Color.BLACK]: chalk.black,
};

export const EVENT_TYPE_TO_COLOR_MAP: Record<MonitoringEventType, Color> = {
  error: Color.RED,
  info: Color.GREEN,
  warning: Color.YELLOW,
};

export const EVENT_SCOPE_TO_COLOR_MAP: Record<MonitoringEventScope, Color> = {
  balancing: Color.BLUE,
};
