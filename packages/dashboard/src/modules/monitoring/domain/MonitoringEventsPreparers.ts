import type MonitoringEventsFilter from './MonitoringEventsFilter';
import type MonitoringEventsSort from './MonitoringEventsSort';

export default interface MonitoringEventsPreparers {
  search: string;
  filters: MonitoringEventsFilter[];
  sorts: MonitoringEventsSort[];
}
