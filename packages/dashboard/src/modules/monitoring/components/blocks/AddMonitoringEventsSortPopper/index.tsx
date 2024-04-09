import { Close } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Popper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { forwardRef, useState } from 'react';

import type { Noop } from '@/utils';

import type {
  MonitoringEventsSort,
  MonitoringEventsSortField,
  MonitoringEventsSortOrder,
} from '../../../domain';
import {
  MONITORING_EVENTS_SORT_FIELDS,
  MONITORING_EVENTS_SORT_ORDERS,
} from '../../../constants';
import { useMonitoringContext } from '../../../hooks';
import { createMonitoringEventsSort } from '../../../logic';

export interface AddMonitoringEventsSortPopperProps {
  readonly anchor: HTMLElement;
  readonly onAdd?: (sort: MonitoringEventsSort) => void;
  readonly onClose?: Noop;
}

export default forwardRef<HTMLDivElement, AddMonitoringEventsSortPopperProps>(
  function AddMonitoringEventsSortPopper({ anchor, onAdd, onClose }, ref) {
    const { sorts } = useMonitoringContext();
    const [field, setField] = useState<MonitoringEventsSortField | ''>('');
    const [order, setOrder] = useState<MonitoringEventsSortOrder | ''>('');
    const existingFields = sorts.map((filter) => filter.field);
    const availableFields = MONITORING_EVENTS_SORT_FIELDS.filter(
      (filter) => !existingFields.includes(filter),
    );
    const filter =
      field && order ? createMonitoringEventsSort(field, order) : null;

    function handleCriteriaChange({
      target,
    }: SelectChangeEvent<MonitoringEventsSortField>) {
      setField(target.value as MonitoringEventsSortField);
    }

    function handleValueChange({
      target,
    }: SelectChangeEvent<MonitoringEventsSortOrder>) {
      setOrder(target.value as MonitoringEventsSortOrder);
    }

    function handleAdd() {
      if (!filter) {
        throw new Error('Filter is not defined');
      }

      onAdd?.(filter);
    }

    return (
      <Popper
        placement="bottom-start"
        anchorEl={anchor}
        ref={ref}
        disablePortal
        open
      >
        <Paper
          sx={{
            width: 200,
            p: 1.5,
          }}
        >
          <Stack spacing={1}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography>Sort</Typography>
              <IconButton onClick={onClose} sx={{ alignSelf: 'flex-end' }}>
                <Close />
              </IconButton>
            </Box>

            <FormControl size="small" fullWidth>
              <InputLabel>Criteria</InputLabel>
              <Select
                size="small"
                label="Criteria"
                value={field}
                onChange={handleCriteriaChange}
                autoFocus
              >
                {availableFields.map((field) => (
                  <MenuItem key={field} value={field}>
                    {field}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Value</InputLabel>
              <Select label="Value" value={order} onChange={handleValueChange}>
                {MONITORING_EVENTS_SORT_ORDERS.map((order) => (
                  <MenuItem key={order} value={order}>
                    {order}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {filter && <Button onClick={handleAdd}>Add</Button>}
          </Stack>
        </Paper>
      </Popper>
    );
  },
);
