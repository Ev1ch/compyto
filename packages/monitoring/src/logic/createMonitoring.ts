/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from 'socket.io';

import { getStringURI } from '@compyto/connections';
import type { Code } from '@compyto/core';
import type { Settings } from '@compyto/settings';
import { createEventsEmitter } from '@compyto/utils';

import type {
  Monitoring,
  MonitoringEvent,
  MonitoringEventKeysMap,
} from '../domain';
import { ANY_MONITORING_EVENT_KEY } from '../constants';
import getMonitoringEventContext from './getMonitoringEventContext';

export default function createMonitoring({
  monitoring,
  dashboard,
}: Settings): Monitoring {
  if (!monitoring) {
    throw new Error(
      'Monitoring settings are required to start the monitoring.',
    );
  }

  const {
    uri: { port },
  } = monitoring;
  const io = dashboard
    ? new Server({ cors: { origin: getStringURI(dashboard.uri) } })
    : null;
  const emitter = createEventsEmitter<MonitoringEventKeysMap>();
  const on = emitter.on.bind(emitter) as any;
  const off = emitter.off.bind(emitter) as any;
  const context = {};
  const events: MonitoringEvent[] = [];

  io?.on('connection', (socket) => {
    const code = socket.handshake.auth.code as Code | undefined;

    if (!code || code !== dashboard!.code) {
      throw new Error('Unauthorized connection');
    }
  });

  const emit: Monitoring['emit'] = (eventKey, ...args) => {
    const eventContext = getMonitoringEventContext();
    io?.emit(eventKey, eventContext, ...args);
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

  const start: Monitoring['start'] = async () => {
    io?.listen(port);
  };

  const waitForDashboard = () =>
    new Promise<void>((resolve, reject) => {
      if (!io) {
        return reject(new Error('Socket server is not created.'));
      }

      function handleConnection() {
        resolve();
      }

      if (io.sockets.sockets.size > 0) {
        return resolve();
      }

      io.once('connection', handleConnection);
    });

  return {
    context,
    events,

    start,
    on,
    off,
    onAny,
    offAny,
    emit,
    waitForDashboard,
  };
}
