import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { memo, type ChangeEvent } from 'react';

import { useDispatch, useSelector } from '@/store/hooks';

import { selectShowAll, setShowAll } from '../../../store';

export default memo(function MonitoringEventsShow() {
  const dispatch = useDispatch();
  const showAll = useSelector(selectShowAll);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setShowAll(event.target.checked));
  };

  return (
    <Box>
      <FormControlLabel
        sx={{ whiteSpace: 'nowrap' }}
        control={<Checkbox onChange={handleChange} checked={showAll} />}
        label="Show all"
      />
    </Box>
  );
});
