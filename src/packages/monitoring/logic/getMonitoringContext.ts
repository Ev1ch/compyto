import type { MonitoringContext } from '../domain';

export default function getMonitoringContext(): MonitoringContext {
  return {
    emittedAt: new Date(),
  };
}
