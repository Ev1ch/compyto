import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  type SxProps,
} from '@mui/material';
import { useCallback } from 'react';

import { useDispatch, useSelector } from '@/store/hooks';

import { Mode } from '../../../domain';
import { MODES } from '../../../constants';
import { selectMode, setMode } from '../../../store';

export interface ModeTogglerProps {
  readonly sx?: SxProps;
}

export default function ModeToggler({ sx }: ModeTogglerProps) {
  const dispatch = useDispatch();
  const mode = useSelector(selectMode);

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      const value = event.target.value as Mode;
      dispatch(setMode(value));
    },
    [dispatch],
  );

  return (
    <FormControl size="small" sx={sx} fullWidth>
      <InputLabel>Theme</InputLabel>
      <Select label="Mode" value={mode} onChange={handleChange}>
        {MODES.map((mode) => (
          <MenuItem key={mode} value={mode}>
            {mode}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
