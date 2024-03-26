/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEventsEmitter } from '@compyto/utils';

import type { Monitoring, MonitoringEventsMap } from '../domain';
import { ANY_MONITORING_EVENT } from '../constants';
import getMonitoringEventContext from './getMonitoringEventContext';

export default function createMonitoring(): Monitoring {
  const emitter = createEventsEmitter<MonitoringEventsMap>();
  const on = emitter.on.bind(emitter) as any;
  const off = emitter.off.bind(emitter) as any;

  const emit: Monitoring['emit'] = (event, ...args) => {
    const context = getMonitoringEventContext();
    // @ts-expect-error Argument of type...
    emitter.emit(event, context, ...(args as any));
    // @ts-expect-error Argument of type...
    emitter.emit(ANY_MONITORING_EVENT, event, context, ...args);
  };

  const onAny: Monitoring['onAny'] = (listener) => {
    // @ts-expect-error Argument of type...
    emitter.on(ANY_MONITORING_EVENT, listener);
  };

  const offAny: Monitoring['offAny'] = (listener) => {
    // @ts-expect-error Argument of type...
    emitter.off(ANY_MONITORING_EVENT, listener);
  };

  return {
    context: {},
    on,
    off,
    onAny,
    offAny,
    emit,
  };
}
