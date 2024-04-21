import { Box, Chip, SxProps } from '@mui/material';
import { memo, useEffect, useRef, useState } from 'react';

import { TYPE_TO_COLOR_MAP } from '@compyto/logging';
import {
  getMonitoringEventKeyParts,
  type MonitoringEvent as TMonitoringEvent,
} from '@compyto/monitoring';
import { EMPTY_OBJECT } from '@/constants';
import { getArrayedSx } from '@/styles/logic';

import { COLOR_TO_CHIP_COLOR_MAP } from '../../../constants';
import MonitoringEventArgs from '../MonitoringEventArgs';
import MonitoringEventKey from '../MonitoringEventKey';

export interface MonitoringEventProps {
  readonly event: TMonitoringEvent;
  readonly sx?: SxProps;
  readonly unfocused?: boolean;
  readonly selected?: boolean;
  readonly onKeyClick?: () => void;
  readonly onExpandToggle?: (event: TMonitoringEvent) => void;
}

export default memo(function MonitoringEvent({
  event,
  onKeyClick,
  onExpandToggle,
  unfocused = false,
  selected = false,
  sx = EMPTY_OBJECT,
}: MonitoringEventProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isFirstRender = useRef(true);
  const { key, context, args } = event;
  const [type] = getMonitoringEventKeyParts(key);
  const typeColor = TYPE_TO_COLOR_MAP[type];
  const areArgsPresent = args.length > 0;

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
          { minHeight: 34, height: 'auto' },
          selected && { bgcolor: 'grey.200' },
        ]}
        variant="outlined"
        color={COLOR_TO_CHIP_COLOR_MAP[typeColor]}
        label={
          <Box>
            <MonitoringEventKey
              eventKey={event.key}
              emittedAt={context.emittedAt}
              onExpandToggle={handleExpandToggle}
              onClick={onKeyClick}
              withArgs={areArgsPresent}
              expanded={isExpanded}
            />
            {isExpanded && <MonitoringEventArgs args={args} />}
          </Box>
        }
      />
    </Box>
  );
});
