import { Chip, Typography } from '@mui/material';

import type { MonitoringEventsSort as TMonitoringEventsSort } from '../../../domain';

export interface MonitoringEventsSortProps {
  readonly sort: TMonitoringEventsSort;
  readonly onDelete?: (sort: TMonitoringEventsSort) => void;
}

export default function MonitoringEventsSort({
  sort,
  onDelete,
}: MonitoringEventsSortProps) {
  function handleDelete() {
    onDelete?.(sort);
  }

  return (
    <Chip
      variant="outlined"
      label={
        <Typography>
          {sort.field}: {sort.order}
        </Typography>
      }
      onDelete={handleDelete}
    />
  );
}
