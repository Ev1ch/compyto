import { FileDownload } from '@mui/icons-material';
import { IconButton, Stack, SxProps } from '@mui/material';

import { useFileDownload } from '@/modules/downloads/hooks';
import { useMonitoringContext } from '@/modules/monitoring/hooks';

export interface MonitoringEventsTransfersProps {
  readonly sx?: SxProps;
}

export default function MonitoringEventsTransfers({
  sx,
}: MonitoringEventsTransfersProps) {
  const { eventsWithPreparers } = useMonitoringContext();
  const { download } = useFileDownload(
    JSON.stringify(eventsWithPreparers),
    'events.json',
  );

  return (
    <Stack direction="row" sx={sx}>
      <IconButton onClick={download}>
        <FileDownload />
      </IconButton>
    </Stack>
  );
}
