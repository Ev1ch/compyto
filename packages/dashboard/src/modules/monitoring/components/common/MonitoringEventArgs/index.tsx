import { Check, ContentCopy } from '@mui/icons-material';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';

export interface MonitoringEventArgsProps {
  readonly args: unknown[];
}

const ICON_SX = { fontSize: 16 };

export default memo(function MonitoringEventArgs({
  args,
}: MonitoringEventArgsProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [version, setVersion] = useState(0);
  const divider = (
    <Typography sx={{ opacity: 0.5 }} component="span">
      &quot;
    </Typography>
  );

  const getCopyClickHandler = useCallback(
    (content: string) => () => {
      navigator.clipboard.writeText(content);
      setIsCopied(true);
      setVersion((prevState) => prevState + 1);
    },
    [],
  );

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isCopied, version]);

  return (
    <List dense disablePadding>
      {args.map((arg, index) => {
        const isNumber = typeof arg === 'number';
        const isString = typeof arg === 'string';
        const isObject = typeof arg === 'object';
        const content =
          isString || isNumber ? String(arg) : JSON.stringify(arg, null, 2);

        return (
          <ListItem
            sx={{ position: 'relative', minHeight: 32 }}
            key={index}
            disablePadding
            disableGutters
          >
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
              sx={{ position: 'absolute', right: 0, top: 0 }}
              onClick={getCopyClickHandler(content)}
            >
              {isCopied ? <Check sx={ICON_SX} /> : <ContentCopy sx={ICON_SX} />}
            </IconButton>
          </ListItem>
        );
      })}
    </List>
  );
});
