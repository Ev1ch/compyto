import { Box, Typography } from '@mui/material';

import MonitoringEventsPreparers from '../MonitoringEventsPreparers';
import MonitoringEventsTree from '../MonitoringEventsTree';

export default function Logger() {
  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h2">Logger</Typography>

      <MonitoringEventsPreparers sx={{ position: 'relative', zIndex: 4 }} />

      <MonitoringEventsTree
        sx={{
          height: '100%',
          overflowY: 'auto',
        }}
      />
    </Box>
  );
}
