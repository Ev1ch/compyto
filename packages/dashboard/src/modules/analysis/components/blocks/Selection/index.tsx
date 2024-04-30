import { Close } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';

import { getTimestamp } from '@compyto/logging';
import { getDatesDifference } from '@compyto/utils';
import { selectPosition } from '@/modules/analysis/store';
import { selectEvent } from '@/modules/monitoring/store';
import { getTopAndHeight } from '@/modules/monitoring/utils';
import { useSelector } from '@/store/hooks';

export interface SelectionProps {
  readonly startEventId: string;
  readonly endEventId: string;
  readonly onRemove: (startEventId: string, endEventId: string) => void;
}

export default function Selection({
  startEventId,
  endEventId,
  onRemove,
}: SelectionProps) {
  const startEvent = useSelector((state) => selectEvent(state, startEventId));
  const startEventPosition = useSelector((state) =>
    selectPosition(state, startEventId),
  );
  const endEvent = useSelector((state) => selectEvent(state, endEventId));
  const endEventPosition = useSelector((state) =>
    selectPosition(state, endEventId),
  );

  if (!startEvent || !startEventPosition) {
    return null;
  }

  if (!endEvent || !endEventPosition) {
    return null;
  }

  const { top, height } = getTopAndHeight(startEventPosition, endEventPosition);
  const timestampDifference =
    endEvent.context.emittedAt > startEvent.context.emittedAt
      ? getDatesDifference(
          endEvent.context.emittedAt,
          startEvent.context.emittedAt,
        )
      : getDatesDifference(
          startEvent.context.emittedAt,
          endEvent.context.emittedAt,
        );

  const handleRemove = () => {
    onRemove?.(startEventId, endEventId);
  };

  return (
    <Box
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
        <IconButton onClick={handleRemove}>
          <Close sx={{ fontSize: 16 }} />
        </IconButton>
      </Stack>
    </Box>
  );
}
