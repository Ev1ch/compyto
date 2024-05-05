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
import { forwardRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { EMPTY_OBJECT } from '@/constants';
import type { Noop } from '@/utils';

import { Sort, SortField, SortOrder } from '../../../domain';
import { SORT_ORDERS } from '../../../constants';
import { createSort } from '../../../logic';
import { selectAvailableSortFields } from '../../../store';

export interface AddSortPopperProps {
  readonly sx?: SxProps;
  readonly anchor: HTMLElement;
  readonly onAdd?: (sort: Sort) => void;
  readonly onClose?: Noop;
}

export default forwardRef<HTMLDivElement, AddSortPopperProps>(
  function AddSortPopper({ anchor, onAdd, onClose, sx = EMPTY_OBJECT }, ref) {
    const [field, setField] = useState<SortField | ''>('');
    const [order, setOrder] = useState<SortOrder | ''>('');
    const availableFields = useSelector(selectAvailableSortFields);
    const filter = field && order ? createSort(field, order) : null;

    function handleCriteriaChange({ target }: SelectChangeEvent<SortField>) {
      setField(target.value as SortField);
    }

    function handleValueChange({ target }: SelectChangeEvent<SortOrder>) {
      setOrder(target.value as SortOrder);
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
              <Typography>Sort</Typography>
              <IconButton onClick={onClose} sx={{ alignSelf: 'flex-end' }}>
                <Close />
              </IconButton>
            </Box>

            <FormControl size="small" required fullWidth>
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
            <FormControl size="small" required fullWidth>
              <InputLabel>Value</InputLabel>
              <Select label="Value" value={order} onChange={handleValueChange}>
                {SORT_ORDERS.map((order) => (
                  <MenuItem key={order} value={order}>
                    {order}
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
