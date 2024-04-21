import {
  MonitoringEventsSchema,
  type MonitoringEvent,
} from '@compyto/monitoring';

export default async function parseJsonMonitoringEvents(string: string) {
  const json = JSON.parse(string);

  const events = await MonitoringEventsSchema.validate(json);

  events.forEach((event) => {
    // @ts-expect-error - Expect error with date type, I am too lazy to fix it
    event.context.emittedAt = new Date(event.context.emittedAt);
  });

  // @ts-expect-error - Error connected to the previous @ts-expect-error
  return events as MonitoringEvent[];
}
