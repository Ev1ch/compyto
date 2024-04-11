import { FileDownload } from '@mui/icons-material';
import { Button, Chip, Stack, SxProps } from '@mui/material';

import { EMPTY_OBJECT } from '@/constants';
import { useFileDownload } from '@/modules/downloads/hooks';
import { useMonitoringContext } from '@/modules/monitoring/hooks';
import { getArrayedSx } from '@/styles/logic';
import { pluralize } from '@/utils';

export interface MonitoringEventsTreeHeaderProps {
  readonly sx?: SxProps;
}

export default function MonitoringEventsTreeHeader({
  sx = EMPTY_OBJECT,
}: MonitoringEventsTreeHeaderProps) {
  const { eventsWithPreparers } = useMonitoringContext();
  const { download } = useFileDownload(
    JSON.stringify(eventsWithPreparers),
    'events.json',
  );
  const eventsNumber = eventsWithPreparers.length;

  return (
    <Stack sx={[{ alignItems: 'center' }, ...getArrayedSx(sx)]} direction="row">
      <Stack sx={{ width: 'calc(100% - 184px)' }} direction="row">
        <Chip
          sx={{
            mx: 'auto',
          }}
          label={`${eventsNumber} ${pluralize('event', eventsNumber)}`}
        />
      </Stack>

      <Button
        sx={{ ml: 'auto' }}
        startIcon={<FileDownload />}
        onClick={download}
        disabled={!eventsNumber}
      >
        Export
      </Button>
    </Stack>
  );
}
