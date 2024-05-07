import { Typography } from '@mui/material';
import { memo } from 'react';

import type { Process } from '@compyto/core';
import { MONITORING_CONTEXT_COLOR } from '@compyto/logging';
import { COLOR_TO_STYLE_COLOR_MAP } from '@/modules/monitoring/constants';

export interface MonitoringContextProps {
  process: Process;
}

export default memo(function MonitoringContext({
  process,
}: MonitoringContextProps) {
  return (
    <Typography
      sx={{ color: COLOR_TO_STYLE_COLOR_MAP[MONITORING_CONTEXT_COLOR] }}
      component="span"
    >
      [{process.code}]
    </Typography>
  );
});
