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
import { EMPTY_OBJECT } from '@/constants';
import { selectValuesByCriteria } from '@/modules/monitoring/store';
import { useSelector } from '@/store/hooks';

import { Filter, FilterCriteria } from '../../../domain';
import { createFilter } from '../../../logic';
import { selectAvailableCriterion } from '../../../store';

export interface AddFilterPopperPopperProps {
  readonly anchor: HTMLElement;
  readonly sx?: SxProps;
  onAdd?: (filter: Filter) => void;
  onClose?: () => void;
}

export default forwardRef<HTMLDivElement, AddFilterPopperPopperProps>(
  function AddFilterPopperPopper(
    { anchor, onAdd, onClose, sx = EMPTY_OBJECT },
    ref,
  ) {
    const [criteria, setCriteria] = useState<FilterCriteria | ''>('');
    const values = useSelector((state) =>
      criteria ? selectValuesByCriteria(state, criteria) : [],
    );
    const availableCriterion = useSelector(selectAvailableCriterion);
    const [value, setValue] = useState<string[]>([]);
    const availableValues = criteria ? uniq(values) : null;
    const filter =
      criteria && value.length > 0 ? createFilter(criteria, value) : null;

    function handleCriteriaChange({
      target: { value },
    }: SelectChangeEvent<FilterCriteria>) {
      setCriteria(value as FilterCriteria);
    }

    function handleValueChange({
      target: { value },
    }: SelectChangeEvent<string[]>) {
      setValue(value as string[]);
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

            <FormControl size="small" required fullWidth>
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
            <FormControl
              size="small"
              disabled={!availableValues || !availableValues.length}
              required
              fullWidth
            >
              <InputLabel>Value</InputLabel>
              <Select
                label="Value"
                value={value}
                onChange={handleValueChange}
                multiple
              >
                {availableValues?.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button onClick={handleAdd} disabled={!filter}>
              Add
            </Button>
          </Stack>
        </Paper>
      </Popper>
    );
  },
);
