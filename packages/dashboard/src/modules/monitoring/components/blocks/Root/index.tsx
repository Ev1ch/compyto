import { Close } from '@mui/icons-material';
import { Box, IconButton, Stack, SxProps, Typography } from '@mui/material';
import { useCallback } from 'react';

import { getTimestamp } from '@compyto/logging';
import type { MonitoringEvent } from '@compyto/monitoring';
import { getDatesDifference } from '@compyto/utils';
import type { Position } from '@/modules/analysis/domain';
import { EMPTY_OBJECT } from '@/constants';
import {
  removeEventsFromPair,
  selectPair,
  selectPositions,
} from '@/modules/analysis/store';
import { useDispatch, useSelector } from '@/store/hooks';
import { getArrayedSx } from '@/styles/logic';

export interface RootProps {
  readonly sx?: SxProps;
}

export default function Root({ sx = EMPTY_OBJECT }: RootProps) {
  const dispatch = useDispatch();
  const pair = useSelector(selectPair);
  const positions = useSelector(selectPositions);
  const events = pair?.events;
  const areEventsPresent = !!events && events.length > 1;

  const getRemoveEventsHandler = useCallback(
    (currentEvent: MonitoringEvent, nextEvent: MonitoringEvent) => () => {
      dispatch(
        removeEventsFromPair([currentEvent.context.id, nextEvent.context.id]),
      );
    },
    [dispatch],
  );

  const getTopAndHeight = useCallback((a: Position, b: Position) => {
    const top = a.top + 15;
    const height = b.top - a.top;

    return { top, height };
  }, []);

  if (!areEventsPresent) {
    return null;
  }

  return (
    <Box
      sx={[
        {
          position: 'absolute',
          height: '100%',
        },
        ...getArrayedSx(sx),
      ]}
    >
      <Box
        sx={[
          {
            position: 'relative',
            height: '100%',
          },
        ]}
      >
        {events.map((currentEvent, index) => {
          const currentEventContext = currentEvent.context;
          const currentEventId = currentEventContext.id;
          const startEventBlock = positions.find(
            (position) => position.id === currentEventId,
          );

          if (!startEventBlock) {
            return null;
          }

          const nextEvent = events[index + 1];

          if (!nextEvent) {
            return null;
          }

          const nextEventContext = nextEvent.context;
          const nextEventId = nextEventContext.id;
          const endEventBlock = positions.find(
            (position) => position.id === nextEventId,
          );

          if (!endEventBlock) {
            return null;
          }

          const { top, height } = getTopAndHeight(
            startEventBlock,
            endEventBlock,
          );
          const timestampDifference =
            nextEventContext.emittedAt > currentEventContext.emittedAt
              ? getDatesDifference(
                  nextEventContext.emittedAt,
                  currentEventContext.emittedAt,
                )
              : getDatesDifference(
                  currentEventContext.emittedAt,
                  nextEventContext.emittedAt,
                );

          return (
            <Box
              key={currentEventId}
              sx={{
                top,
                height,
                borderLeft: '1px solid',
                borderColor: 'grey.300',
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Stack sx={{ zIndex: 3 }} alignItems="center" direction="row">
                <Typography
                  sx={{
                    mx: 1,
                  }}
                >
                  {getTimestamp(timestampDifference)}
                </Typography>
                <IconButton
                  onClick={getRemoveEventsHandler(currentEvent, nextEvent)}
                >
                  <Close sx={{ fontSize: 16 }} />
                </IconButton>
              </Stack>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
