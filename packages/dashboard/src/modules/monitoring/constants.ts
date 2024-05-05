import { green, orange, red } from '@mui/material/colors';

import { Color } from '@compyto/logging';

export const COLOR_TO_STYLE_COLOR_MAP: Record<Color, string> = {
  [Color.BLACK]: 'black',
  [Color.RED]: 'red',
  [Color.GREEN]: 'green',
  [Color.YELLOW]: 'yellow',
  [Color.BLUE]: 'blue',
  [Color.MAGENTA]: 'magenta',
  [Color.CYAN]: 'cyan',
  [Color.WHITE]: 'white',
  [Color.GRAY]: 'gray',
};

export const COLOR_TO_CHIP_COLOR_MAP = {
  [Color.GREEN]: 'success',
  [Color.YELLOW]: 'warning',
  [Color.RED]: 'error',
} as const;

export const COLOR_TO_CHIP_BACKGROUND_COLOR_MAP = {
  [Color.GREEN]: green[100],
  [Color.YELLOW]: orange[100],
  [Color.RED]: red[100],
} as const;
