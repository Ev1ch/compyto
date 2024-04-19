import { Paper, Stack, type SxProps } from '@mui/material';
import { memo } from 'react';

import { EMPTY_OBJECT } from '@/constants';
import { getArrayedSx } from '@/styles/logic';

import MonitoringEventsFilters from '../MonitoringEventsFilters';
import MonitoringEventsSearch from '../MonitoringEventsSearch';
import MonitoringEventsShow from '../MonitoringEventsShow';
import MonitoringEventsSorts from '../MonitoringEventsSorts';

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
        <MonitoringEventsShow />

        <MonitoringEventsFilters />

        <MonitoringEventsSorts />

        <MonitoringEventsSearch sx={SEARCH_SX} />
      </Stack>
    </Paper>
  );
});
