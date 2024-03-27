import type { Process } from '@compyto/core';

type Data = unknown;

export interface ProcessWithData {
  data: Data;
  process: Process;
}

export default Data;
