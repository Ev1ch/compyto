import { Typography } from '@mui/material';
import { memo } from 'react';

import type { Process } from '@compyto/core';

export interface MonitoringContextProps {
  process: Process;
}

export default memo(function MonitoringContext({
  process,
}: MonitoringContextProps) {
  return <Typography component="span">[{process.code}]</Typography>;
});
