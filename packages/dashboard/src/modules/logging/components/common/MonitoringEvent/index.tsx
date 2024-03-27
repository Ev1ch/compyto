import { Box } from '@mui/material';

import type {
  MonitoringEvent,
  MonitoringEventContext,
} from '@compyto/monitoring';

export interface MonitoringEventProps {
  readonly event: MonitoringEvent;
  readonly context: MonitoringEventContext;
}

export default function MonitoringEvent({
  event,
  context,
}: MonitoringEventProps) {
  return <Box></Box>;
}
