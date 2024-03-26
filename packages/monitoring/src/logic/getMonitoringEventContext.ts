import { createId } from '@compyto/utils/logic';

import type { MonitoringEventContext } from '../domain';

export default function getMonitoringEventContext(): MonitoringEventContext {
  return {
    id: createId(),
    emittedAt: new Date(),
  };
}
