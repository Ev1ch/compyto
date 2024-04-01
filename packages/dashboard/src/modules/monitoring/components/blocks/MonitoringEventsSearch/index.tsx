import { SxProps, TextField } from '@mui/material';
import { ChangeEvent } from 'react';

import { EMPTY_OBJECT } from '@/constants';

import { useLoggerContext } from '../../../contexts';

export interface MonitoringEventsSearchProps {
  sx?: SxProps;
}

export default function MonitoringEventsSearch({
  sx = EMPTY_OBJECT,
}: MonitoringEventsSearchProps) {
  const { search, setSearch } = useLoggerContext();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearch(value);
  }

  return (
    <TextField
      sx={sx}
      label="Search"
      size="small"
      value={search}
      onChange={handleChange}
    />
  );
}
