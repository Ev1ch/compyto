import type { MonitoringEventWithContext } from '@compyto/monitoring';

export default function getEventsBySearch(
  eventWithContexts: MonitoringEventWithContext[],
  search: string,
) {
  return eventWithContexts.filter(({ event: { key } }) =>
    key.toLowerCase().includes(search.toLowerCase()),
  );
}
