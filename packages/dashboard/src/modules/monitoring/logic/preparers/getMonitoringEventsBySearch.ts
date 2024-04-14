import type { MonitoringEvent } from '@compyto/monitoring';

export default function getEventsBySearch(
  events: MonitoringEvent[],
  search: string,
) {
  return events.filter(({ key }) =>
    key.toLowerCase().includes(search.toLowerCase()),
  );
}
