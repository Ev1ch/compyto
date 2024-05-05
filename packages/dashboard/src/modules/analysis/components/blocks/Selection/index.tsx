import { Close } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';

import { getTimestamp } from '@compyto/logging';
import { getTimestampDifference } from '@compyto/utils';
import { selectPosition } from '@/modules/analysis/store';
import { selectEventWithContext } from '@/modules/monitoring/store';
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
  const startEventWithContext = useSelector((state) =>
    selectEventWithContext(state, startEventId),
  );
  const startEventPosition = useSelector((state) =>
    selectPosition(state, startEventId),
  );
  const endEventWithCondition = useSelector((state) =>
    selectEventWithContext(state, endEventId),
  );
  const endEventPosition = useSelector((state) =>
    selectPosition(state, endEventId),
  );

  if (!startEventWithContext || !startEventPosition) {
    return null;
  }

  if (!endEventWithCondition || !endEventPosition) {
    return null;
  }

  const { top, height } = getTopAndHeight(startEventPosition, endEventPosition);
  const startEventEmittedAt = startEventWithContext.event.context.emittedAt;
  const endEventEmittedAt = endEventWithCondition.event.context.emittedAt;
  const timestampDifference =
    endEventEmittedAt > startEventEmittedAt
      ? getTimestampDifference(endEventEmittedAt, startEventEmittedAt)
      : getTimestampDifference(startEventEmittedAt, endEventEmittedAt);

  const handleRemove = () => {
    onRemove?.(startEventId, endEventId);
  };

  return (
    <Box
      sx={{
        top,
        height,
        borderLeft: '1px solid',
        borderColor: 'divider',
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
