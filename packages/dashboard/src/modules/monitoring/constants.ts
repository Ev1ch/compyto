import { Color } from '@compyto/logging';

export const COLOR_TO_STYLE_COLOR_MAP: Record<Color, string> = {
  [Color.BLACK]: 'text.primary',
  [Color.RED]: 'error.main',
  [Color.GREEN]: 'success.main',
  [Color.YELLOW]: 'warning.main',
  [Color.BLUE]: 'info.main',
  [Color.MAGENTA]: 'secondary.main',
  [Color.WHITE]: 'background.default',
  [Color.GRAY]: 'action.active',

  [Color.CYAN]: 'cyan',
};

export const COLOR_TO_CHIP_COLOR_MAP = {
  [Color.GREEN]: 'success',
  [Color.YELLOW]: 'warning',
  [Color.RED]: 'error',
} as const;
