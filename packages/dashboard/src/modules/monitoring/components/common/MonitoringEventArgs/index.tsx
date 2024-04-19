import { List, ListItem, ListItemText } from '@mui/material';
import { memo } from 'react';

export interface MonitoringEventArgsProps {
  readonly args: unknown[];
}

export default memo(function MonitoringEventArgs({
  args,
}: MonitoringEventArgsProps) {
  return (
    <List dense disablePadding>
      {args.map((arg, index) => (
        <ListItem key={index} disablePadding disableGutters>
          <ListItemText primary={JSON.stringify(arg, null, 2)} />
        </ListItem>
      ))}
    </List>
  );
});
