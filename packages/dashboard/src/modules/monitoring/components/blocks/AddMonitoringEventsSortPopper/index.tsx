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
  type SxProps,
} from '@mui/material';
import { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { EMPTY_OBJECT } from '@/constants';
import { useOutsideClick } from '@/hooks';
import { selectAvailableSortFields } from '@/modules/monitoring/store';
import type { Noop } from '@/utils';

import type {
  MonitoringEventsSort,
  MonitoringEventsSortField,
  MonitoringEventsSortOrder,
} from '../../../domain';
import { MONITORING_EVENTS_SORT_ORDERS } from '../../../constants';
import { createMonitoringEventsSort } from '../../../logic';

export interface AddMonitoringEventsSortPopperProps {
  readonly sx?: SxProps;
  readonly anchor: HTMLElement;
  readonly onAdd?: (sort: MonitoringEventsSort) => void;
  readonly onClose?: Noop;
}

export default memo(function AddMonitoringEventsSortPopper({
  anchor,
  onAdd,
  onClose,
  sx = EMPTY_OBJECT,
}: AddMonitoringEventsSortPopperProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [field, setField] = useState<MonitoringEventsSortField | ''>('');
  const [order, setOrder] = useState<MonitoringEventsSortOrder | ''>('');
  const availableFields = useSelector(selectAvailableSortFields);
  const isOutsideClick = useOutsideClick(ref);
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

  useEffect(() => {
    if (isOutsideClick) {
      onClose?.();
    }
  }, [isOutsideClick, onClose]);

  return (
    <Popper
      sx={sx}
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
});
