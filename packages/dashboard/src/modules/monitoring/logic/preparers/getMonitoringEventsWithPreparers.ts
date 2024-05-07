import type { MonitoringEventWithContext } from '@compyto/monitoring';
import {
  getMonitoringEventsByFilters,
  getMonitoringEventsBySearch,
} from '@/modules/filtering/logic';
import { getMonitoringEventsWithSorts } from '@/modules/sorting/logic';

import type { MonitoringEventsPreparers } from '../../domain';

export default function getMonitoringEventsWithPreparers(
  eventWithContexts: MonitoringEventWithContext[],
  { search, filters, sorts }: MonitoringEventsPreparers,
) {
  const filteredEvents = getMonitoringEventsByFilters(
    eventWithContexts,
    filters,
  );
  const searchedEvents = getMonitoringEventsBySearch(filteredEvents, search);
  const sortedEvents = getMonitoringEventsWithSorts(searchedEvents, sorts);

  return sortedEvents;
}
