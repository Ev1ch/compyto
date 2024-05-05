import type { BaseMonitoring } from '@compyto/monitoring';

export default function getProcessKeyByMonitoring({
  context: { process },
}: BaseMonitoring): string {
  if (!process) {
    throw new Error('Monitoring context does not have process');
  }

  return process.code;
}
