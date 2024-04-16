import type { Process } from '@compyto/core';

type Data = unknown;

export interface ProcessWithData<TData = Data> {
  data: TData;
  process: Process;
}

export default Data;
