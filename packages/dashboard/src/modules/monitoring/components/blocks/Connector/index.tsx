import { Box, SxProps } from '@mui/material';
import { memo } from 'react';

import { EMPTY_OBJECT } from '@/constants';
import { getArrayedSx } from '@/styles/logic';

export interface ConnectorProps {
  readonly direction?: 'left' | 'right';
  readonly width?: string | number;
  readonly sx?: SxProps;
  readonly rounded?: boolean;
  readonly thickness?: number;
  readonly size?: number;
}

export default memo(function Connector({
  direction,
  width,
  sx = EMPTY_OBJECT,
  rounded = false,
  thickness = 2,
  size = 10,
}: ConnectorProps) {
  return (
    <Box
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          width,

          '&::before': {
            content: '""',
            height: `${thickness}px`,
            width: '100%',
            bgcolor: 'divider',
          },
          '&::after': {
            flexShrink: 0,
            content: '""',
            width: size,
            height: size,
            bgcolor: 'divider',
            borderRadius: '50%',
          },
        },
        direction === 'left' && {
          flexDirection: 'row-reverse',
        },
        rounded && {
          '&::after': {
            borderRadius: 0,
          },
        },
        ...getArrayedSx(sx),
      ]}
    />
  );
});
