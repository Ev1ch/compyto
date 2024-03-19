import type { MonitoringEventContext } from '../domain';

export default function getMonitoringEventContext(): MonitoringEventContext {
  return {
    emittedAt: new Date(),
  };
}
