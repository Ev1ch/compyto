import type { EventListener } from '@compyto/utils';

import type MonitoringContext from './MonitoringContext';
import type MonitoringEventContext from './MonitoringEventContext';
import type MonitoringEventKeys from './MonitoringEventKeys';
import type MonitoringEventKeysMap from './MonitoringEventKeysMap';

export default interface Monitoring {
  context: MonitoringContext;

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

  emit<TEventKey extends MonitoringEventKeys>(
    event: TEventKey,
    ...args: MonitoringEventKeysMap[TEventKey]
  ): void;
}
