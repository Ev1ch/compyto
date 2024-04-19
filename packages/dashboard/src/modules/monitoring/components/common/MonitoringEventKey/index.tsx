import { ArrowRight } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { memo, type MouseEvent } from 'react';

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
  onExpandToggle?: (event: MouseEvent<SVGSVGElement>) => void;
}

export default memo(function MonitoringEventKey({
  eventKey,
  emittedAt,
  onExpandToggle,
  withArgs = false,
  expanded = false,
}: MonitoringEventKeyProps) {
  const [type, scope, name] = getMonitoringEventKeyParts(eventKey);
  const scopeColor = EVENT_SCOPE_TO_COLOR_MAP[scope];

  return (
    <Typography sx={[withArgs && { cursor: 'pointer' }]}>
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
      {withArgs && (
        <ArrowRight
          sx={[
            { verticalAlign: 'middle' },
            expanded && {
              transform: 'rotate(90deg)',
            },
          ]}
          onClick={onExpandToggle}
        />
      )}
    </Typography>
  );
});
