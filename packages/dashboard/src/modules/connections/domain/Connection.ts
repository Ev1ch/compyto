import type {
  MonitoringEventContext,
  MonitoringEventKeys,
  MonitoringEventKeysMap,
} from '@compyto/monitoring';
import type { EventListener } from '@compyto/utils';

export default interface Connection {
  readonly isConnected: boolean;

  start(): void;

  on<TEventKey extends MonitoringEventKeys>(
    event: TEventKey,
    listener: EventListener<
      [MonitoringEventContext, ...MonitoringEventKeysMap[TEventKey]]
    >,
  ): void;

  onAny(
    listener: EventListener<
      [
        MonitoringEventKeys,
        MonitoringEventContext,
        ...MonitoringEventKeysMap[MonitoringEventKeys],
      ]
    >,
  ): void;

  off<TEventKey extends MonitoringEventKeys>(
    event: TEventKey,
    listener: EventListener<
      [MonitoringEventContext, ...MonitoringEventKeysMap[TEventKey]]
    >,
  ): void;

  offAny(
    listener: EventListener<
      [
        MonitoringEventKeys,
        MonitoringEventContext,
        ...MonitoringEventKeysMap[MonitoringEventKeys],
      ]
    >,
  ): void;
}
