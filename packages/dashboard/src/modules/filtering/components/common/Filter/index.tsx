import { Chip, Typography } from '@mui/material';

import type { Filter as TFilter } from '../../../domain';

export interface FilterProps {
  readonly filter: TFilter;
  readonly onDelete?: (filter: TFilter) => void;
}

export default function Filter({ filter, onDelete }: FilterProps) {
  function handleDelete() {
    onDelete?.(filter);
  }

  return (
    <Chip
      variant="outlined"
      label={
        <Typography>
          {filter.criteria}: {filter.value.join(', ')}
        </Typography>
      }
      onDelete={handleDelete}
    />
  );
}
