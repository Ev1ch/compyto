import type { MonitoringContext } from '@compyto/monitoring';

import {
  COLOR_TO_PRINT_METHOD_MAP,
  MONITORING_CONTEXT_COLOR,
  UNKNOWN_PROCESS_CODE,
} from '../constants';

export default function getColoredMonitoringContext({
  process,
}: MonitoringContext) {
  const code = process?.code ?? UNKNOWN_PROCESS_CODE;

  return COLOR_TO_PRINT_METHOD_MAP[MONITORING_CONTEXT_COLOR](
    `[Process: ${code}]`,
  );
}
