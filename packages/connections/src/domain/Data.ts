import type { Process } from '@compyto/core';

type Data = unknown;

export interface ProcessWithData<T = Data> {
  data: T;
  process: Process;
}

export default Data;
