import { ArrowRight } from '@mui/icons-material';
import {
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  SxProps,
  Typography,
} from '@mui/material';
import { memo, MouseEvent, useEffect, useRef, useState } from 'react';

import {
  EVENT_SCOPE_TO_COLOR_MAP,
  getTimestamp,
  TYPE_TO_COLOR_MAP,
} from '@compyto/logging';
import {
  getMonitoringEventKeyParts,
  SCOPE_DELIMITER,
  TYPE_DELIMITER,
  type MonitoringEvent as TMonitoringEvent,
} from '@compyto/monitoring';
import { EMPTY_OBJECT } from '@/constants';
import { getArrayedSx } from '@/styles/logic';

import {
  COLOR_TO_CHIP_COLOR_MAP,
  COLOR_TO_STYLE_COLOR_MAP,
} from '../../../constants';
import { Connector } from '../../blocks';

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
  const [type, scope, name] = getMonitoringEventKeyParts(key);
  const typeColor = TYPE_TO_COLOR_MAP[type];
  const scopeColor = EVENT_SCOPE_TO_COLOR_MAP[scope];
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
        {
          display: 'inline-flex',
        },
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
            <Typography sx={[areArgsPresent && { cursor: 'pointer' }]}>
              <Typography component="span">
                [{getTimestamp(context.emittedAt)}]
              </Typography>{' '}
              <Typography component="span">
                {type}
                {TYPE_DELIMITER}
              </Typography>
              <Typography
                sx={{ color: COLOR_TO_STYLE_COLOR_MAP[scopeColor] }}
                component="span"
              >
                {scope}
                {SCOPE_DELIMITER}
              </Typography>
              <Typography sx={{ color: 'black' }} component="span">
                {name}
              </Typography>
              {areArgsPresent && (
                <ArrowRight
                  sx={[
                    { verticalAlign: 'middle' },
                    isExpanded && {
                      transform: 'rotate(90deg)',
                    },
                  ]}
                  onClick={handleExpandToggle}
                />
              )}
            </Typography>
            {isExpanded && (
              <List dense disablePadding>
                {args.map((arg, index) => (
                  <ListItem key={index} disablePadding disableGutters>
                    <ListItemText primary={JSON.stringify(arg, null, 2)} />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        }
      />
      <Connector sx={{ mt: 1.25, mb: 'auto' }} width={200} />
    </Box>
  );
});
