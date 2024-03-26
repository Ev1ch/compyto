import { monitoring } from '@compyto/monitoring/logic';

import {
  COLOR_TO_PRINT_METHOD_MAP,
  MONITORING_CONTEXT_COLOR,
} from '../constants';

export default function getColoredMonitoringContext() {
  const processCode = monitoring.context.process?.code;

  if (!processCode) {
    return '';
  }

  return COLOR_TO_PRINT_METHOD_MAP[MONITORING_CONTEXT_COLOR](
    `[Process: ${processCode}]`,
  );
}
