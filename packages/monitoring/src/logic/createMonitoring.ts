/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from 'socket.io';

import { URI } from '@compyto/connections';
import { createEventsEmitter } from '@compyto/utils';

import type { Monitoring, MonitoringEventKeysMap } from '../domain';
import { ANY_MONITORING_EVENT_KEY } from '../constants';
import getMonitoringEventContext from './getMonitoringEventContext';

export default function createMonitoring({ uri }: { uri: URI }): Monitoring {
  const { port } = uri;
  const io = new Server();
  const emitter = createEventsEmitter<MonitoringEventKeysMap>();
  const on = emitter.on.bind(emitter) as any;
  const off = emitter.off.bind(emitter) as any;

  const emit: Monitoring['emit'] = (eventKey, ...args) => {
    const eventContext = getMonitoringEventContext();
    io.emit(eventKey, eventContext, ...args);
    // @ts-expect-error Argument of type...
    emitter.emit(eventKey, eventContext, ...(args as any));
    // @ts-expect-error Argument of type...
    emitter.emit(ANY_MONITORING_EVENT_KEY, eventKey, eventContext, ...args);
  };

  const onAny: Monitoring['onAny'] = (listener) => {
    // @ts-expect-error Argument of type...
    emitter.on(ANY_MONITORING_EVENT_KEY, listener);
  };

  const offAny: Monitoring['offAny'] = (listener) => {
    // @ts-expect-error Argument of type...
    emitter.off(ANY_MONITORING_EVENT_KEY, listener);
  };

  io.listen(port);

  return {
    on,
    off,
    onAny,
    offAny,
    emit,
  };
}
