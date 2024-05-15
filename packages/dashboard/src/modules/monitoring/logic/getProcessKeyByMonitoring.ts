import type { MonitoringContext } from '@compyto/monitoring';

export default function getProcessKeyByMonitoring({
  process,
}: MonitoringContext): string {
  if (!process) {
    throw new Error('Monitoring context does not have process');
  }

  return process.code;
}
