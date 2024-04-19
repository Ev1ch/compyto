import { Box, SxProps } from '@mui/material';
import { memo, useCallback } from 'react';

import { EMPTY_OBJECT } from '@/constants';
import {
  removeEventsFromPair,
  selectPairEventIds,
} from '@/modules/analysis/store';
import { useDispatch, useSelector } from '@/store/hooks';
import { getArrayedSx } from '@/styles/logic';

import Selection from '../Selection';

export interface RootProps {
  readonly sx?: SxProps;
}

export default memo(function Selections({ sx = EMPTY_OBJECT }: RootProps) {
  const dispatch = useDispatch();
  const eventIds = useSelector(selectPairEventIds);
  const areEventsPresent = eventIds.length > 1;

  const handleSelectionRemove = useCallback(
    (currentEvent: string, nextEvent: string) => {
      dispatch(removeEventsFromPair([currentEvent, nextEvent]));
    },
    [dispatch],
  );

  if (!areEventsPresent) {
    return null;
  }

  return (
    <Box
      sx={[
        {
          position: 'absolute',
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
        {eventIds.map((currentEventId, index) => {
          const nextEventId = eventIds[index + 1];

          if (!nextEventId) {
            return null;
          }

          return (
            <Selection
              key={currentEventId}
              startEventId={currentEventId}
              endEventId={nextEventId}
              onRemove={handleSelectionRemove}
            />
          );
        })}
      </Box>
    </Box>
  );
});
