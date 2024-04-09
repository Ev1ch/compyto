import { FileDownload } from '@mui/icons-material';
import { Button, Stack, SxProps } from '@mui/material';

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
      <Button startIcon={<FileDownload />} onClick={download}>
        Export
      </Button>
    </Stack>
  );
}
