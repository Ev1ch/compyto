import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { type ReactNode } from 'react';

import { useSelector } from '@/store/hooks';
import { MODE_TO_THEME_MAP } from '@/styles/constants';
import { selectMode } from '@/styles/store';

export interface ThemeProviderProps {
  readonly children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const mode = useSelector(selectMode);
  const theme = MODE_TO_THEME_MAP[mode];

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
