import { ContentCopy } from '@mui/icons-material';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { memo } from 'react';

export interface MonitoringEventArgsProps {
  readonly args: unknown[];
}

export default memo(function MonitoringEventArgs({
  args,
}: MonitoringEventArgsProps) {
  const getCopyClickHandler = (content: string) => () => {
    navigator.clipboard.writeText(content);
  };

  const divider = (
    <Typography sx={{ opacity: 0.5 }} component="span">
      &quot;
    </Typography>
  );

  return (
    <List dense disablePadding>
      {args.map((arg, index) => {
        const isNumber = typeof arg === 'number';
        const isString = typeof arg === 'string';
        const isObject = typeof arg === 'object';
        const content =
          isString || isNumber ? String(arg) : JSON.stringify(arg, null, 2);

        return (
          <ListItem key={index} disablePadding disableGutters>
            <ListItemText
              primary={
                <Typography
                  sx={[
                    isNumber && {
                      fontStyle: 'italic',
                    },
                  ]}
                  component={isObject ? 'pre' : 'p'}
                >
                  {isString && divider}
                  {content}
                  {isString && divider}
                </Typography>
              }
            />

            <IconButton
              sx={{ mb: 'auto' }}
              onClick={getCopyClickHandler(content)}
            >
              <ContentCopy sx={{ fontSize: 16 }} />
            </IconButton>
          </ListItem>
        );
      })}
    </List>
  );
});
