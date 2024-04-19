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
  Stack,
  SxProps,
  Typography,
  type SelectChangeEvent,
} from '@mui/material';
import { forwardRef, useState } from 'react';

import { uniq } from '@compyto/utils';
import {
  MonitoringEventsFilterCriteria,
  type MonitoringEventsFilter,
} from '@/modules/monitoring/domain';
import { EMPTY_OBJECT } from '@/constants';
import { useSelector } from '@/store/hooks';

import { createMonitoringEventsFilter } from '../../../logic';
import {
  selectAvailableCriterion,
  selectValuesByCriteria,
} from '../../../store';

export interface AddMonitoringEventsFilterPopperProps {
  readonly anchor: HTMLElement;
  readonly sx?: SxProps;
  onAdd?: (filter: MonitoringEventsFilter) => void;
  onClose?: () => void;
}

export default forwardRef<HTMLDivElement, AddMonitoringEventsFilterPopperProps>(
  function AddMonitoringEventsFilterPopper(
    { anchor, onAdd, onClose, sx = EMPTY_OBJECT },
    ref,
  ) {
    const [criteria, setCriteria] = useState<
      MonitoringEventsFilterCriteria | ''
    >('');
    const values = useSelector((state) =>
      criteria ? selectValuesByCriteria(state, criteria) : [],
    );
    const availableCriterion = useSelector(selectAvailableCriterion);
    const [value, setValue] = useState<string | ''>('');
    const availableValues = criteria ? uniq(values) : null;
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
