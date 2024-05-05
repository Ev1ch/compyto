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

import type { Sort as TSort } from '../../../domain';
import { SORT_FIELDS } from '../../../constants';
import { addSort, removeSort, selectSorts } from '../../../store';
import { Sort } from '../../common';
import AddSortPopper from '../AddSortPopper';

export interface SortsProps {
  readonly sx?: SxProps;
}

export default memo(function Sorts({ sx = EMPTY_OBJECT }: SortsProps) {
  const dispatch = useDispatch();
  const sorts = useSelector(selectSorts);
  const [isAddPopperOpen, setAddPopperOpen] = useState(false);
  const addButtonRef = useRef(null);
  const isAddingFiltersAvailable = sorts.length !== SORT_FIELDS.length;

  const handleDelete = useCallback(
    (sort: TSort) => {
      dispatch(removeSort(sort.id));
    },
    [dispatch],
  );

  const handleAddClick = useCallback(() => {
    setAddPopperOpen(true);
  }, []);

  const handleAddSort = useCallback(
    (sort: TSort) => {
      dispatch(addSort(sort));
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
          minWidth: 95,
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
        }}
        component={Paper}
        direction="row"
        spacing={1}
      >
        <Typography>Sorts</Typography>
        <Divider orientation="vertical" flexItem />
        <IconButton
          ref={addButtonRef}
          onClick={handleAddClick}
          disabled={!isAddingFiltersAvailable}
        >
          <AddBox />
        </IconButton>
      </Stack>

      {sorts.length !== 0 && (
        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
          {sorts.map((sort) => (
            <Sort key={sort.id} sort={sort} onDelete={handleDelete} />
          ))}
        </Stack>
      )}

      {addButtonRef.current && isAddPopperOpen && (
        <AddSortPopper
          onAdd={handleAddSort}
          onClose={handleCloseClick}
          anchor={addButtonRef.current}
        />
      )}
    </Stack>
  );
});
