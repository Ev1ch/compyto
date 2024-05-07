import { createTheme } from '@mui/material';

import { Mode } from './domain';

export const hideScrollbarSx = {
  '&::-webkit-scrollbar': {
    display: 'none',
  },
} as const;

export const lightTheme = createTheme();

export const darkTheme = createTheme({
  palette: {
    mode: Mode.DARK,
  },
});

export const MODES = [Mode.LIGHT, Mode.DARK] as const;

export const MODE_TO_THEME_MAP = {
  [Mode.LIGHT]: lightTheme,
  [Mode.DARK]: darkTheme,
};
