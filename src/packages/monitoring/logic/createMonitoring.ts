import { createEventsEmitter } from '@/utils/logic';

import type { Monitoring, MonitoringEventsMap } from '../domain';
import { ANY_MONITORING_EVENT } from '../constants';

export default function createMonitoring(): Monitoring {
  const emitter = createEventsEmitter<MonitoringEventsMap>();
  const on = emitter.on.bind(emitter);
  const off = emitter.off.bind(emitter);

  const emit: Monitoring['emit'] = (event, ...args) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emitter.emit(event, ...(args as any));
    // @ts-expect-error Argument of type...
    emitter.emit(ANY_MONITORING_EVENT, event, ...args);
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
