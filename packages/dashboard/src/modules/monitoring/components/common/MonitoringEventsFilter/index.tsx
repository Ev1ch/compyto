import { Chip, Typography } from '@mui/material';

import type { MonitoringEventsFilter as TMonitoringEventsFilter } from '../../../domain';

export interface MonitoringEventsFilterProps {
  readonly filter: TMonitoringEventsFilter;
  readonly onDelete?: (filter: TMonitoringEventsFilter) => void;
}

export default function MonitoringEventsFilter({
  filter,
  onDelete,
}: MonitoringEventsFilterProps) {
  function handleDelete() {
    onDelete?.(filter);
  }

  return (
    <Chip
      variant="outlined"
      label={
        <Typography>
          {filter.criteria}: {filter.value}
        </Typography>
      }
      onDelete={handleDelete}
    />
  );
}
