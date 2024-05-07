import { debounce, TextField, type SxProps } from '@mui/material';
import {
  memo,
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
} from 'react';

import { EMPTY_OBJECT } from '@/constants';
import { useDispatch } from '@/store/hooks';
import { getArrayedSx } from '@/styles/logic';

import { setSearch as setStoreSearch } from '../../../store';

export interface SearchProps {
  readonly sx?: SxProps;
}

export default memo(function Search({ sx = EMPTY_OBJECT }: SearchProps) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  const debouncedSetStoreSearch = useCallback(
    debounce((value: string) => {
      dispatch(setStoreSearch(value));
    }),
    [dispatch],
  );

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  }, []);

  useEffect(() => {
    debouncedSetStoreSearch(search);
  }, [search, debouncedSetStoreSearch]);

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
