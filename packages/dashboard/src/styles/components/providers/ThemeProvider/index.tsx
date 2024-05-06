import { ThemeProvider as MuiThemeProvider } from '@mui/material';

import type { ProviderProps } from '@/components/providers';
import { useSelector } from '@/store/hooks';
import { MODE_TO_THEME_MAP } from '@/styles/constants';
import { selectMode } from '@/styles/store';

export default function ThemeProvider({ children }: ProviderProps) {
  const mode = useSelector(selectMode);
  const theme = MODE_TO_THEME_MAP[mode];

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
