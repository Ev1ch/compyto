import { Close, FileDownload } from '@mui/icons-material';
import { Button, Chip, Stack, SxProps } from '@mui/material';
import { memo, useCallback } from 'react';

import { EMPTY_OBJECT } from '@/constants';
import { removePair, selectIsPairPresent } from '@/modules/analysis/store';
import { useFileDownload } from '@/modules/downloads/hooks';
import { selectEventsWithPreparers } from '@/modules/monitoring/store';
import { useDispatch, useSelector } from '@/store/hooks';
import { getArrayedSx } from '@/styles/logic';
import { pluralize } from '@/utils';

export interface MonitoringEventsTreeHeaderProps {
  readonly sx?: SxProps;
}

export default memo(function MonitoringEventsTreeHeader({
  sx = EMPTY_OBJECT,
}: MonitoringEventsTreeHeaderProps) {
  const dispatch = useDispatch();
  const eventsWithPreparers = useSelector(selectEventsWithPreparers);
  const isPairPresent = useSelector(selectIsPairPresent);
  const { download } = useFileDownload(
    JSON.stringify(eventsWithPreparers),
    'events.json',
  );
  const eventsNumber = eventsWithPreparers.length;

  const handleDeselectClick = useCallback(() => {
    dispatch(removePair());
  }, [dispatch]);

  return (
    <Stack sx={[{ alignItems: 'center' }, ...getArrayedSx(sx)]} direction="row">
      <Stack sx={{ width: 'calc(100% - 184px)' }} direction="row">
        <Button
          startIcon={<Close />}
          onClick={handleDeselectClick}
          disabled={!isPairPresent}
        >
          Deselect all
        </Button>

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
});
