import { ArrowRight } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { memo } from 'react';

import { EVENT_SCOPE_TO_COLOR_MAP, getTimestamp } from '@compyto/logging';
import {
  getMonitoringEventKeyParts,
  SCOPE_DELIMITER,
  TYPE_DELIMITER,
  type MonitoringEventKey,
  type MonitoringContext as TMonitoringContext,
} from '@compyto/monitoring';
import { COLOR_TO_STYLE_COLOR_MAP } from '@/modules/monitoring/constants';

import MonitoringContext from '../MonitoringContext';

export interface MonitoringEventKeyProps {
  readonly context?: TMonitoringContext;
  readonly Key: MonitoringEventKey;
  readonly emittedAt: number;
  readonly withArgs?: boolean;
  readonly expanded?: boolean;
  onExpandToggle?: () => void;
  onClick?: () => void;
}

export default memo(function MonitoringEventKey({
  context,
  Key,
  emittedAt,
  onClick,
  onExpandToggle,
  withArgs = false,
  expanded = false,
}: MonitoringEventKeyProps) {
  const [type, scope, name] = getMonitoringEventKeyParts(Key);
  const scopeColor = EVENT_SCOPE_TO_COLOR_MAP[scope];

  return (
    <Typography
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={[!!onClick && { cursor: 'pointer', mr: 'auto' }]}
        onClick={onClick}
        component="span"
      >
        <Typography component="span">
          [<Box component="time">{getTimestamp(emittedAt)}</Box>]{' '}
          {context?.process && <MonitoringContext process={context.process} />}
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
            { ml: 0.5, color: 'inherit' },
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
