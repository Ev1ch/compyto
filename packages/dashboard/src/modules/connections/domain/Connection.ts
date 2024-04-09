export type EventCallback<TArgs extends unknown[]> = (...args: TArgs) => void;

export type EventsMap = Record<string, unknown[]>;

export default interface Connection<TEventsMap extends EventsMap = EventsMap> {
  on<TEvent extends keyof TEventsMap>(
    event: TEvent,
    callback: EventCallback<TEventsMap[TEvent]>,
  ): void;
}
