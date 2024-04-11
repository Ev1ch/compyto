import { Box, Stack, type SxProps } from '@mui/material';

import { EMPTY_OBJECT } from '@/constants';
import { getArrayedSx } from '@/styles/logic';

import { useMonitoringContext } from '../../../hooks';
import { MonitoringEvent } from '../../common';
import MonitoringEventsTreeHeader from '../MonitoringEventsTreeHeader';

export interface MonitoringEventsTreeProps {
  readonly sx?: SxProps;
}

export default function MonitoringEventsTree({
  sx = EMPTY_OBJECT,
}: MonitoringEventsTreeProps) {
  const { eventsWithPreparers } = useMonitoringContext();

  return (
    <Box
      sx={[
        {
          p: 2,
        },
        ...getArrayedSx(sx),
      ]}
    >
      <Box
        sx={{
          position: 'relative',
          minHeight: '100%',
        }}
      >
        <MonitoringEventsTreeHeader
          sx={{ position: 'sticky', mb: 1, top: 0 }}
        />

        <Stack
          sx={{
            position: 'relative',
            alignItems: 'flex-end',
            mr: 22.65,
            zIndex: 2,
          }}
          spacing={1}
        >
          {eventsWithPreparers.map((event) => (
            <MonitoringEvent key={event.context.id} event={event} />
          ))}
        </Stack>
        <Box
          sx={{
            top: 0,
            bottom: 0,
            width: 5,
            bgcolor: 'grey.300',
            position: 'absolute',
            right: 184,
            zIndex: 1,
          }}
        />
      </Box>
    </Box>
  );
}
