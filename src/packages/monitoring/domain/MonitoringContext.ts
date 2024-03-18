import type { Process } from '@/core/domain';

export default interface MonitoringContext {
  process?: Process;
}
