import { Box, Typography } from '@mui/material';
import { memo } from 'react';

import MonitoringEventsPreparers from '../MonitoringEventsPreparers';
import MonitoringEventsTree from '../MonitoringEventsTree';

const PREPARERS_SX = {
  position: 'relative',
  zIndex: 5,
};

const TREE_SX = {
  height: '100%',
  overflowY: 'auto',
};

export default memo(function Logger() {
  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ mb: 3 }} variant="h3" component="h1">
        Dashboard
      </Typography>

      <MonitoringEventsPreparers sx={PREPARERS_SX} />

      <MonitoringEventsTree sx={TREE_SX} />
    </Box>
  );
});
