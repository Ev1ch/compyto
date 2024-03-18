/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEventsEmitter } from '@/utils/logic';

import type { Monitoring, MonitoringEventsMap } from '../domain';
import { ANY_MONITORING_EVENT } from '../constants';
import getMonitoringContext from './getMonitoringContext';

export default function createMonitoring(): Monitoring {
  const emitter = createEventsEmitter<MonitoringEventsMap>();
  const on = emitter.on.bind(emitter) as any;
  const off = emitter.off.bind(emitter) as any;

  const emit: Monitoring['emit'] = (event, ...args) => {
    const context = getMonitoringContext();
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
    on,
    off,
    onAny,
    offAny,
    emit,
  };
}
