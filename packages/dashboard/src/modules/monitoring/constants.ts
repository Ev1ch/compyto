import { Color } from '@compyto/logging';

import {
  MonitoringEventsFilterCriteria,
  MonitoringEventsSortOrder,
} from './domain';

export const COLOR_TO_STYLE_COLOR_MAP: Record<Color, string> = {
  [Color.BLACK]: 'black',
  [Color.RED]: 'red',
  [Color.GREEN]: 'green',
  [Color.YELLOW]: 'yellow',
  [Color.BLUE]: 'blue',
  [Color.MAGENTA]: 'magenta',
  [Color.CYAN]: 'cyan',
  [Color.WHITE]: 'white',
  [Color.GRAY]: 'gray',
};

export const COLOR_TO_CHIP_COLOR_MAP = {
  [Color.GREEN]: 'success',
  [Color.YELLOW]: 'warning',
  [Color.RED]: 'error',
} as const;

export const MONITORING_EVENTS_FILTER_CRITERION = [
  MonitoringEventsFilterCriteria.TYPE,
  MonitoringEventsFilterCriteria.SCOPE,
] as const;

export const MONITORING_EVENTS_SORT_FIELDS = [
  'key',
  'context.id',
  'context.emittedAt',
] as const;

export const MONITORING_EVENTS_SORT_ORDERS = [
  MonitoringEventsSortOrder.ASCENDING,
  MonitoringEventsSortOrder.DESCENDING,
];
