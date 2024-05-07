import type { MonitoringData } from '@compyto/monitoring';

export default function getProcessKeyByMonitoring({
  context: { process },
}: MonitoringData): string {
  if (!process) {
    throw new Error('Monitoring context does not have process');
  }

  return process.code;
}
