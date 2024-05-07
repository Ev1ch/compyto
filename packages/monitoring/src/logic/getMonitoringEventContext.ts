import { createId } from '@compyto/utils';

import type { MonitoringEventContext } from '../domain';

export default function getMonitoringEventContext(): MonitoringEventContext {
  return {
    id: createId(),
    emittedAt: Date.now(),
  };
}
