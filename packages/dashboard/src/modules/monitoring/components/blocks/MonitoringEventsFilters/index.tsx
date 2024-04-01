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

import type { MonitoringEventsFilter as TMonitoringEventsFilter } from '../../../domain';
import { MONITORING_EVENTS_FILTER_CRITERION } from '../../../constants';
import { useLoggerContext } from '../../../contexts';
import { MonitoringEventsFilter } from '../../common';
import AddMonitoringEventsFilterPopper from '../AddMonitoringEventsFilterPopper';

export interface MonitoringEventsFiltersProps {
  readonly sx?: SxProps;
}

export default function MonitoringEventsFilters({
  sx = EMPTY_OBJECT,
}: MonitoringEventsFiltersProps) {
  const { filters, removeFilter, addFilter } = useLoggerContext();
  const [isAddPopperOpen, setAddPopperOpen] = useState(false);
  const addButtonRef = useRef(null);
  const isAddingFiltersAvailable =
    filters.length !== MONITORING_EVENTS_FILTER_CRITERION.length;

  const handleDelete = useCallback(
    (filter: TMonitoringEventsFilter) => {
      removeFilter(filter.id);
    },
    [removeFilter],
  );

  const handleAddClick = useCallback(() => {
    setAddPopperOpen(true);
  }, []);

  const handleAddFilter = useCallback(
    (filter: TMonitoringEventsFilter) => {
      addFilter(filter);
      setAddPopperOpen(false);
    },
    [addFilter],
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
        <Typography>Filters</Typography>
        <Divider orientation="vertical" flexItem />
        {isAddingFiltersAvailable && (
          <IconButton ref={addButtonRef} onClick={handleAddClick}>
            <AddBox />
          </IconButton>
        )}
      </Stack>

      {filters.length !== 0 && (
        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
          {filters.map((filter) => (
            <MonitoringEventsFilter
              key={filter.id}
              filter={filter}
              onDelete={handleDelete}
            />
          ))}
          {addButtonRef.current && isAddPopperOpen && (
            <AddMonitoringEventsFilterPopper
              onAdd={handleAddFilter}
              onClose={handleCloseClick}
              anchor={addButtonRef.current}
            />
          )}
        </Stack>
      )}
    </Stack>
  );
}
