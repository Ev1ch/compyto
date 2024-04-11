import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { ChangeEvent } from 'react';

import { useMonitoringContext } from '../../../hooks';

export default function MonitoringEventsShow() {
  const { showAll, setShowAll } = useMonitoringContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShowAll(event.target.checked);
  };

  return (
    <Box>
      <FormControlLabel
        control={<Checkbox onChange={handleChange} value={showAll} />}
        label="Show all"
      />
    </Box>
  );
}
