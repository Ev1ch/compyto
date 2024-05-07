/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Settings } from '@compyto/settings';
import { createEventsEmitter } from '@compyto/utils';

import type {
  Monitoring,
  MonitoringEvent,
  MonitoringEventKeysMap,
} from '../domain';
import { ANY_MONITORING_EVENT_KEY } from '../constants';
import getMonitoringEventContext from './getMonitoringEventContext';

export default function createMonitoring({ monitoring }: Settings): Monitoring {
  if (!monitoring) {
    throw new Error(
      'Monitoring settings are required to start the monitoring.',
    );
  }

  const emitter = createEventsEmitter<MonitoringEventKeysMap>();
  const on = emitter.on.bind(emitter) as any;
  const off = emitter.off.bind(emitter) as any;
  const context = {};
  const events: MonitoringEvent[] = [];

  const emit: Monitoring['emit'] = (eventKey, ...args) => {
    const eventContext = getMonitoringEventContext();
    // @ts-expect-error Argument of type...
    emitter.emit(eventKey, eventContext, ...(args as any));
    // @ts-expect-error Argument of type...
    emitter.emit(ANY_MONITORING_EVENT_KEY, eventKey, eventContext, ...args);
    events.push({ key: eventKey, context: eventContext, args });
  };

  const onAny: Monitoring['onAny'] = (listener) => {
    // @ts-expect-error Argument of type...
    emitter.on(ANY_MONITORING_EVENT_KEY, listener);
  };

  const offAny: Monitoring['offAny'] = (listener) => {
    // @ts-expect-error Argument of type...
    emitter.off(ANY_MONITORING_EVENT_KEY, listener);
  };

  const start: Monitoring['start'] = async () => {};

  return {
    context,
    events,

    start,
    on,
    off,
    onAny,
    offAny,
    emit,
  };
}
