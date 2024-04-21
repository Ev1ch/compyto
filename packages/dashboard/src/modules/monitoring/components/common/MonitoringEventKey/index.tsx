import { ArrowRight } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { memo } from 'react';

import { EVENT_SCOPE_TO_COLOR_MAP, getTimestamp } from '@compyto/logging';
import {
  getMonitoringEventKeyParts,
  SCOPE_DELIMITER,
  TYPE_DELIMITER,
  type MonitoringEventKey,
} from '@compyto/monitoring';
import { COLOR_TO_STYLE_COLOR_MAP } from '@/modules/monitoring/constants';

export interface MonitoringEventKeyProps {
  readonly eventKey: MonitoringEventKey;
  readonly emittedAt: Date;
  readonly withArgs?: boolean;
  readonly expanded?: boolean;
  onExpandToggle?: () => void;
  onClick?: () => void;
}

export default memo(function MonitoringEventKey({
  eventKey,
  emittedAt,
  onClick,
  onExpandToggle,
  withArgs = false,
  expanded = false,
}: MonitoringEventKeyProps) {
  const [type, scope, name] = getMonitoringEventKeyParts(eventKey);
  const scopeColor = EVENT_SCOPE_TO_COLOR_MAP[scope];

  return (
    <Typography
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={[!!onClick && { cursor: 'pointer' }]}
        onClick={onClick}
        component="span"
      >
        <Typography component="span">
          [<Box component="time">{getTimestamp(emittedAt)}</Box>]
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
      </Typography>

      {withArgs && (
        <IconButton
          sx={[
            { ml: 0.5 },
            expanded && {
              transform: 'rotate(90deg)',
            },
          ]}
          onClick={onExpandToggle}
        >
          <ArrowRight sx={{ fontSize: 16 }} />
        </IconButton>
      )}
    </Typography>
  );
});
