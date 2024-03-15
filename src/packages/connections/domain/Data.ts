import type { Process } from '@/core/domain';

type Data = unknown;

export interface ProcessWithData {
  data: Data;
  process: Process;
}

export default Data;
