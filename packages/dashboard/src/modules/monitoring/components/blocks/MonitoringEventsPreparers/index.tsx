import { Paper, Stack, type SxProps } from '@mui/material';
import { memo } from 'react';

import { EMPTY_OBJECT } from '@/constants';
import { Filters, Search, Show } from '@/modules/filtering/components/blocks';
import { Sorts } from '@/modules/sorting/components/blocks';
import { ModeToggler } from '@/styles/components/blocks';
import { getArrayedSx } from '@/styles/logic';

export interface MonitoringEventsPreparersProps {
  readonly sx?: SxProps;
}

const SEARCH_SX = {
  ml: 'auto',
};

export default memo(function MonitoringEventsPreparers({
  sx = EMPTY_OBJECT,
}: MonitoringEventsPreparersProps) {
  return (
    <Paper sx={[{ p: 2 }, ...getArrayedSx(sx)]}>
      <Stack gap={4} direction="row">
        <Show />

        <Filters />

        <Sorts />

        <Stack sx={SEARCH_SX} gap={1} direction="row">
          <ModeToggler />
          <Search />
        </Stack>
      </Stack>
    </Paper>
  );
});
