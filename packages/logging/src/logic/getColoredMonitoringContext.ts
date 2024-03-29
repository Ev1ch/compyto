import type { Process } from '@compyto/core';

import {
  COLOR_TO_PRINT_METHOD_MAP,
  MONITORING_CONTEXT_COLOR,
} from '../constants';

export default function getColoredMonitoringContext({ code }: Process) {
  return COLOR_TO_PRINT_METHOD_MAP[MONITORING_CONTEXT_COLOR](
    `[Process: ${code}]`,
  );
}
