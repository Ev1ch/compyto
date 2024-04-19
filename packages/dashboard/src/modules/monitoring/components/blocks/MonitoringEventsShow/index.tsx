import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { ChangeEvent } from 'react';

import { useDispatch, useSelector } from '@/store/hooks';

import { selectShowAll, setShowAll } from '../../../store';

export default function MonitoringEventsShow() {
  const dispatch = useDispatch();
  const showAll = useSelector(selectShowAll);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setShowAll(event.target.checked));
  };

  return (
    <Box>
      <FormControlLabel
        control={<Checkbox onChange={handleChange} checked={showAll} />}
        label="Show all"
      />
    </Box>
  );
}
