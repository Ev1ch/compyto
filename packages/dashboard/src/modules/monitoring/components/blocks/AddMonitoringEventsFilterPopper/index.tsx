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

import {
  MonitoringEventsFilter,
  MonitoringEventsFilterCriteria,
} from '@/modules/monitoring/domain';
import { MONITORING_EVENTS_FILTER_CRITERION } from '@/modules/monitoring/constants';
import { useLoggerContext } from '@/modules/monitoring/contexts';
import { createMonitoringEventsFilter } from '@/modules/monitoring/logic';
import { uniq } from '@/utils';

export interface AddMonitoringEventsFilterPopperProps {
  anchor: HTMLElement;
  onAdd?: (filter: MonitoringEventsFilter) => void;
  onClose?: () => void;
}

export default forwardRef<HTMLDivElement, AddMonitoringEventsFilterPopperProps>(
  function AddMonitoringEventsFilterPopper({ anchor, onAdd, onClose }, ref) {
    const { filters, getValuesByCriteria } = useLoggerContext();
    const [criteria, setCriteria] = useState<
      MonitoringEventsFilterCriteria | ''
    >('');
    const [value, setValue] = useState<string | ''>('');
    const existingCriterion = filters.map((filter) => filter.criteria);
    const availableCriterion = MONITORING_EVENTS_FILTER_CRITERION.filter(
      (filter) => !existingCriterion.includes(filter),
    );
    const availableValues = criteria
      ? uniq(getValuesByCriteria(criteria))
      : null;
    const filter =
      criteria && value ? createMonitoringEventsFilter(criteria, value) : null;

    function handleCriteriaChange({
      target,
    }: SelectChangeEvent<MonitoringEventsFilterCriteria>) {
      setCriteria(target.value as MonitoringEventsFilterCriteria);
    }

    function handleValueChange({ target }: SelectChangeEvent<string>) {
      setValue(target.value);
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
              <Typography>Filter</Typography>
              <IconButton onClick={onClose} sx={{ alignSelf: 'flex-end' }}>
                <Close />
              </IconButton>
            </Box>

            <FormControl size="small" fullWidth>
              <InputLabel>Criteria</InputLabel>
              <Select
                size="small"
                label="Criteria"
                value={criteria}
                onChange={handleCriteriaChange}
                autoFocus
              >
                {availableCriterion.map((criteria) => (
                  <MenuItem key={criteria} value={criteria}>
                    {criteria}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {availableValues && (
              <FormControl size="small" fullWidth>
                <InputLabel>Value</InputLabel>
                <Select
                  label="Value"
                  value={value}
                  onChange={handleValueChange}
                >
                  {availableValues.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {filter && <Button onClick={handleAdd}>Add</Button>}
          </Stack>
        </Paper>
      </Popper>
    );
  },
);
