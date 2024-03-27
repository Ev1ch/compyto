import { Box, List, ListItem, ListItemText } from '@mui/material';

import { useLoggerContext } from '../../../contexts';

export default function Logger() {
  const { events } = useLoggerContext();

  return (
    <Box>
      <List>
        {events.map(({ event, context }) => (
          <ListItem key={context.id}>
            <ListItemText>{event}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
