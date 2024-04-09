import { AddBox } from '@mui/icons-material';
import {
  Divider,
  IconButton,
  Stack,
  Typography,
  type SxProps,
} from '@mui/material';
import { useCallback, useRef, useState } from 'react';

import { EMPTY_OBJECT } from '@/constants';
import { hideScrollbarSx } from '@/styles/constants';
import { getArrayedSx } from '@/styles/logic';

import type { MonitoringEventsSort as TMonitoringEventsSort } from '../../../domain';
import { MONITORING_EVENTS_SORT_FIELDS } from '../../../constants';
import { useMonitoringContext } from '../../../hooks';
import { MonitoringEventsSort } from '../../common';
import AddSortPopper from '../AddMonitoringEventsSortPopper';

export interface MonitoringEventsSortsProps {
  readonly sx?: SxProps;
}

export default function MonitoringEventsSorts({
  sx = EMPTY_OBJECT,
}: MonitoringEventsSortsProps) {
  const { sorts, removeSort, addSort } = useMonitoringContext();
  const [isAddPopperOpen, setAddPopperOpen] = useState(false);
  const addButtonRef = useRef(null);
  const isAddingFiltersAvailable =
    sorts.length !== MONITORING_EVENTS_SORT_FIELDS.length;

  const handleDelete = useCallback(
    (sort: TMonitoringEventsSort) => {
      removeSort(sort.id);
    },
    [removeSort],
  );

  const handleAddClick = useCallback(() => {
    setAddPopperOpen(true);
  }, []);

  const handleAddSort = useCallback(
    (sort: TMonitoringEventsSort) => {
      addSort(sort);
      setAddPopperOpen(false);
    },
    [addSort],
  );

  const handleCloseClick = useCallback(() => {
    setAddPopperOpen(false);
  }, []);

  return (
    <Stack
      sx={[
        { alignItems: 'center', minHeight: 32, overflowX: 'auto' },
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
          bgcolor: 'white',
          alignSelf: 'stretch',
          zIndex: 1,
        }}
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
            <MonitoringEventsSort
              key={sort.id}
              sort={sort}
              onDelete={handleDelete}
            />
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
}
