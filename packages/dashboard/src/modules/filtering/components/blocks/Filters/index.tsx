import { AddBox } from '@mui/icons-material';
import {
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
  type SxProps,
} from '@mui/material';
import { memo, useCallback, useRef, useState } from 'react';

import { EMPTY_OBJECT } from '@/constants';
import { useDispatch, useSelector } from '@/store/hooks';
import { hideScrollbarSx } from '@/styles/constants';
import { getArrayedSx } from '@/styles/logic';

import { Filter as TFilter } from '../../../domain';
import { FILTER_CRITERION } from '../../../constants';
import { addFilter, removeFilter, selectFilters } from '../../../store';
import { Filter } from '../../common';
import AddFilterPopper from '../AddFilterPopper';

export interface FiltersProps {
  readonly sx?: SxProps;
}

export default memo(function Filters({ sx = EMPTY_OBJECT }: FiltersProps) {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const [isAddPopperOpen, setAddPopperOpen] = useState(false);
  const addButtonRef = useRef(null);
  const isAddingFiltersAvailable = filters.length !== FILTER_CRITERION.length;

  const handleDelete = useCallback(
    (filter: TFilter) => {
      dispatch(removeFilter(filter.id));
    },
    [dispatch],
  );

  const handleAddClick = useCallback(() => {
    setAddPopperOpen(true);
  }, []);

  const handleAddFilter = useCallback(
    (filter: TFilter) => {
      dispatch(addFilter(filter));
      setAddPopperOpen(false);
    },
    [dispatch],
  );

  const handleCloseClick = useCallback(() => {
    setAddPopperOpen(false);
  }, []);

  return (
    <Stack
      sx={[
        {
          alignItems: 'center',
          minHeight: 32,
          overflowX: 'auto',
        },
        hideScrollbarSx,
        ...getArrayedSx(sx),
      ]}
      direction="row"
      spacing={1}
    >
      <Stack
        sx={{
          alignItems: 'center',
          position: 'sticky',
          left: 0,
          alignSelf: 'stretch',
          zIndex: 1,
          minWidth: 101,
          boxShadow: 'none',
        }}
        component={Paper}
        direction="row"
        spacing={1}
      >
        <Typography>Filters</Typography>
        <Divider orientation="vertical" flexItem />
        <IconButton
          ref={addButtonRef}
          onClick={handleAddClick}
          disabled={!isAddingFiltersAvailable}
        >
          <AddBox />
        </IconButton>
      </Stack>

      <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
        {filters.map((filter) => (
          <Filter key={filter.id} filter={filter} onDelete={handleDelete} />
        ))}
        {addButtonRef.current && isAddPopperOpen && (
          <AddFilterPopper
            onAdd={handleAddFilter}
            onClose={handleCloseClick}
            anchor={addButtonRef.current}
          />
        )}
      </Stack>
    </Stack>
  );
});
