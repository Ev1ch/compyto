import { Box, Chip, SxProps } from '@mui/material';
import { memo, MouseEvent, useEffect, useRef, useState } from 'react';

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
  readonly onClick?: (event: TMonitoringEvent) => void;
  readonly onExpandToggle?: (event: TMonitoringEvent) => void;
}

export default memo(function MonitoringEvent({
  event,
  onClick,
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

  function handleExpandToggle(event: MouseEvent<SVGSVGElement>) {
    event.stopPropagation();
    setIsExpanded((prevState) => !prevState);
  }

  function handleClick() {
    onClick?.(event);
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
        onClick && {
          cursor: 'pointer',
        },
        ...getArrayedSx(sx),
      ]}
      onClick={handleClick}
    >
      <Chip
        sx={[{ height: 'auto' }, selected && { bgcolor: 'grey.200' }]}
        variant="outlined"
        color={COLOR_TO_CHIP_COLOR_MAP[typeColor]}
        label={
          <Box>
            <MonitoringEventKey
              eventKey={event.key}
              emittedAt={context.emittedAt}
              onExpandToggle={handleExpandToggle}
              withArgs={areArgsPresent}
            />
            {isExpanded && <MonitoringEventArgs args={args} />}
          </Box>
        }
      />
    </Box>
  );
});
