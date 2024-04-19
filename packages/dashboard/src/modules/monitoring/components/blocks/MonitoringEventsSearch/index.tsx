import { SxProps, TextField } from '@mui/material';
import { ChangeEvent, memo } from 'react';

import { EMPTY_OBJECT } from '@/constants';
import { useDispatch, useSelector } from '@/store/hooks';
import { getArrayedSx } from '@/styles/logic';

import { selectSearch, setSearch } from '../../../store';

export interface MonitoringEventsSearchProps {
  readonly sx?: SxProps;
}

export default memo(function MonitoringEventsSearch({
  sx = EMPTY_OBJECT,
}: MonitoringEventsSearchProps) {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    dispatch(setSearch(value));
  }

  return (
    <TextField
      sx={[{ width: 300, flexShrink: 0 }, ...getArrayedSx(sx)]}
      label="Search"
      size="small"
      value={search}
      onChange={handleChange}
    />
  );
});
