import { Paper, Stack, type SxProps } from '@mui/material';

import { EMPTY_OBJECT } from '@/constants';
import { getArrayedSx } from '@/styles/logic';

import MonitoringEventsFilters from '../MonitoringEventsFilters';
import MonitoringEventsSearch from '../MonitoringEventsSearch';
import MonitoringEventsSorts from '../MonitoringEventsSorts';

export interface MonitoringEventsPreparersProps {
  readonly sx?: SxProps;
}

export default function MonitoringEventsPreparers({
  sx = EMPTY_OBJECT,
}: MonitoringEventsPreparersProps) {
  return (
    <Paper sx={[{ p: 2 }, ...getArrayedSx(sx)]}>
      <Stack gap={4} direction="row">
        <MonitoringEventsFilters />

        <MonitoringEventsSorts />

        <MonitoringEventsSearch sx={{ ml: 'auto' }} />
      </Stack>
    </Paper>
  );
}
