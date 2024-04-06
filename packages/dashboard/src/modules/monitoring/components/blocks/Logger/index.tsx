import { Paper, Typography } from '@mui/material';

import MonitoringEventsPreparers from '../MonitoringEventsPreparers';
import MonitoringEventsTree from '../MonitoringEventsTree';

export default function Logger() {
  return (
    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h2">Logger</Typography>

      <MonitoringEventsPreparers sx={{ position: 'relative', zIndex: 3 }} />

      <MonitoringEventsTree
        sx={{
          height: '100%',
          overflowY: 'auto',
        }}
      />
    </Paper>
  );
}
