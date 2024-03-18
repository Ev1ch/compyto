import type { Reducer } from '@/utils/domain';

import type MonitoringEvent from './MonitoringEvent';

type MonitoringEventsMap = Reducer<
  [Record<MonitoringEvent<'info', 'balancing', 'example'>, [number]>]
>;

export type MonitoringEvents = keyof MonitoringEventsMap;

export default MonitoringEventsMap;
