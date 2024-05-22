import { Box, Stack, type SxProps } from '@mui/material';
import { memo, useRef } from 'react';

import { EMPTY_OBJECT } from '@/constants';
import { Selections } from '@/modules/analysis/components/blocks';
import { useSelector } from '@/store/hooks';
import { getArrayedSx } from '@/styles/logic';

import { selectShownEvents } from '../../../store';
import MonitoringEventNode from '../MonitoringEventNode';
import MonitoringEventsTreeFooter from '../MonitoringEventsTreeFooter';
import MonitoringEventsTreeHeader from '../MonitoringEventsTreeHeader';

export interface MonitoringEventsTreeProps {
  readonly sx?: SxProps;
}

const ROOT_SX = {
  left: 2,
};

export default memo(function MonitoringEventsTree({
  sx = EMPTY_OBJECT,
}: MonitoringEventsTreeProps) {
  const treeRef = useRef<HTMLDivElement>(null);
  const shownEvents = useSelector(selectShownEvents);

  return (
    <Box
      sx={[
        {
          p: 2,
        },
        ...getArrayedSx(sx),
      ]}
      component="section"
      ref={treeRef}
    >
      <Box
        sx={{
          position: 'relative',
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MonitoringEventsTreeHeader
          sx={{ position: 'sticky', mb: 1, top: 0, zIndex: 4 }}
        />

        <Box
          sx={{
            position: 'relative',
            minHeight: '100%',
            flexGrow: 1,
            mr: 22.65,
          }}
        >
          <Selections sx={ROOT_SX} />

          <Stack
            sx={{
              position: 'relative',
              alignItems: 'flex-end',
              zIndex: 2,
            }}
            spacing={1}
          >
            {shownEvents.map(({ event, context }) => (
              <MonitoringEventNode
                key={event.context.id}
                event={event}
                context={context}
              />
            ))}
          </Stack>
          <Box
            sx={{
              top: 0,
              bottom: 0,
              right: 2.25,
              width: 5,
              bgcolor: 'divider',
              position: 'absolute',
            }}
          />
        </Box>

        <MonitoringEventsTreeFooter
          sx={{ position: 'fixed', bottom: 40, right: 40, zIndex: 4 }}
          treeRef={treeRef}
        />
      </Box>
    </Box>
  );
});
