import { SxProps, TextField } from '@mui/material';
import { ChangeEvent } from 'react';

import { EMPTY_OBJECT } from '@/constants';
import { getArrayedSx } from '@/styles/logic';

import { useMonitoringContext } from '../../../hooks';

export interface MonitoringEventsSearchProps {
  sx?: SxProps;
}

export default function MonitoringEventsSearch({
  sx = EMPTY_OBJECT,
}: MonitoringEventsSearchProps) {
  const { search, setSearch } = useMonitoringContext();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearch(value);
  }

  return (
    <TextField
      sx={[{ width: 300 }, ...getArrayedSx(sx)]}
      label="Search"
      size="small"
      value={search}
      onChange={handleChange}
    />
  );
}
