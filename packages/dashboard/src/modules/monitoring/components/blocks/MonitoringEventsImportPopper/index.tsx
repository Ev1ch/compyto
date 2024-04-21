import {
  Button,
  ClickAwayListener,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import { memo } from 'react';

import { Noop } from '@/utils';

export interface MonitoringEventsImportPopperProps {
  readonly anchor: HTMLElement;
  onConfirm: Noop;
  onCancel: Noop;
}

export default memo(function MonitoringEventsImportPopper({
  anchor,
  onCancel,
  onConfirm,
}: MonitoringEventsImportPopperProps) {
  return (
    <ClickAwayListener onClickAway={onCancel}>
      <Popper anchorEl={anchor} placement="bottom-end" disablePortal open>
        <Paper
          sx={{
            p: 1.5,
            width: 300,
          }}
        >
          <Typography sx={{ mb: 1 }}>
            There are events in dashboard. Are you sure you want to import new
            events and{' '}
            <Typography
              sx={{ fontWeight: 700 }}
              variant="inherit"
              component="span"
            >
              override existing
            </Typography>
            ?
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button onClick={onCancel} size="small">
              Cancel
            </Button>
            <Button onClick={onConfirm} color="warning" size="small">
              Confirm
            </Button>
          </Stack>
        </Paper>
      </Popper>
    </ClickAwayListener>
  );
});
