import { Box, Chip, SxProps } from '@mui/material';
import { memo, useEffect, useRef, useState } from 'react';

import { TYPE_TO_COLOR_MAP } from '@compyto/logging';
import {
  getMonitoringEventKeyParts,
  MonitoringContext,
  type MonitoringEvent as TMonitoringEvent,
} from '@compyto/monitoring';
import { EMPTY_OBJECT } from '@/constants';
import { getArrayedSx } from '@/styles/logic';

import { COLOR_TO_CHIP_COLOR_MAP } from '../../../constants';
import { MonitoringEventArgs, MonitoringEventKey } from '../../common';

export interface MonitoringEventProps {
  readonly event: TMonitoringEvent;
  readonly context: MonitoringContext;
  readonly sx?: SxProps;
  readonly unfocused?: boolean;
  readonly selected?: boolean;
  readonly onKeyClick?: () => void;
  readonly onExpandToggle?: (event: TMonitoringEvent) => void;
}

export default memo(function MonitoringEvent({
  event,
  context,
  onKeyClick,
  onExpandToggle,
  unfocused = false,
  selected = false,
  sx = EMPTY_OBJECT,
}: MonitoringEventProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFirstRender = useRef(true);
  const [type] = getMonitoringEventKeyParts(event.key);
  const typeColor = TYPE_TO_COLOR_MAP[type];
  const areArgsPresent = event.args.length > 0;

  function handleExpandToggle() {
    setIsExpanded((prevState) => !prevState);
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    onExpandToggle?.(event);
  }, [isExpanded, onExpandToggle, event]);

  return (
    <Box
      sx={[
        unfocused && {
          opacity: 0.2,
        },
        ...getArrayedSx(sx),
      ]}
    >
      <Chip
        sx={[
          {
            minHeight: 34,
            height: 'auto',
          },
          selected && { bgcolor: 'divider' },
        ]}
        variant="outlined"
        color={COLOR_TO_CHIP_COLOR_MAP[typeColor]}
        label={
          <Box>
            <MonitoringEventKey
              Key={event.key}
              context={context}
              emittedAt={event.context.emittedAt}
              onExpandToggle={handleExpandToggle}
              onClick={onKeyClick}
              withArgs={areArgsPresent}
              expanded={isExpanded}
            />
            {isExpanded && <MonitoringEventArgs args={event.args} />}
          </Box>
        }
      />
    </Box>
  );
});
