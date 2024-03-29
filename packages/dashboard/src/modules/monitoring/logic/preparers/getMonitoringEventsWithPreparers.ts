import type { MonitoringEvent } from '@compyto/monitoring';

import type { MonitoringEventsPreparers } from '../../domain';
import getMonitoringEventsByFilters from './getMonitoringEventsByFilters';
import getMonitoringEventsBySearch from './getMonitoringEventsBySearch';
import getMonitoringEventsWithSorts from './getMonitoringEventsWithSorts';

export default function getMonitoringEventsWithPreparers(
  events: MonitoringEvent[],
  { search, filters, sorts }: MonitoringEventsPreparers,
) {
  const filteredEvents = getMonitoringEventsByFilters(events, filters);
  const searchedEvents = getMonitoringEventsBySearch(filteredEvents, search);
  const sortedEvents = getMonitoringEventsWithSorts(searchedEvents, sorts);

  return sortedEvents;
}
