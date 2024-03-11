import type { Process } from '@/core/domain';

import type { Connection } from '../domain';

export default function getConnectionByProcess<TConnection extends Connection>(
  connections: TConnection[],
  process: Process,
) {
  return connections.find(({ device }) => device.process === process);
}
