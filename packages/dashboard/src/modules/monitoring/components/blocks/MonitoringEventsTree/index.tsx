import { Box, Stack, type SxProps } from '@mui/material';
import { useEffect, useState } from 'react';

import { EMPTY_OBJECT } from '@/constants';
import { removePair } from '@/modules/analysis/store';
import { useDispatch, useSelector } from '@/store/hooks';
import { getArrayedSx } from '@/styles/logic';

import { selectShownEvents } from '../../../store';
import MonitoringEventNode from '../MonitoringEventNode';
import MonitoringEventsTreeHeader from '../MonitoringEventsTreeHeader';
import Root from '../Root';

export interface MonitoringEventsTreeProps {
  readonly sx?: SxProps;
}

const ROOT_SX = {
  left: 2.5,
};

export default function MonitoringEventsTree({
  sx = EMPTY_OBJECT,
}: MonitoringEventsTreeProps) {
  const dispatch = useDispatch();
  const [eventsBlock, setEventsBlock] = useState<HTMLDivElement | null>(null);
  const shownEvents = useSelector(selectShownEvents);

  useEffect(() => {
    dispatch(removePair());
  }, [shownEvents, dispatch]);

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
          sx={{ position: 'sticky', mb: 1, top: 0, zIndex: 4 }}
        />

        {eventsBlock && <Root sx={ROOT_SX} eventsBlock={eventsBlock} />}

        <Stack
          sx={{
            position: 'relative',
            alignItems: 'flex-end',
            mr: 22.65,
            zIndex: 2,
          }}
          spacing={1}
          ref={setEventsBlock}
        >
          {shownEvents.map((shownEvent) => (
            <MonitoringEventNode
              key={shownEvent.context.id}
              event={shownEvent}
            />
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
          }}
        />
      </Box>
    </Box>
  );
}
