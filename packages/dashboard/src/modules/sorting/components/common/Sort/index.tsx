import { Chip, Typography } from '@mui/material';

import type { Sort as TSort } from '../../../domain';

export interface SortProps {
  readonly sort: TSort;
  readonly onDelete?: (sort: TSort) => void;
}

export default function Sort({ sort, onDelete }: SortProps) {
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
