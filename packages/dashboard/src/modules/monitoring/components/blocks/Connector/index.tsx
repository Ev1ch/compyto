import { Box, SxProps } from '@mui/material';
import { forwardRef } from 'react';

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

export default forwardRef<HTMLDivElement, ConnectorProps>(function Connector(
  {
    direction,
    width,
    sx = EMPTY_OBJECT,
    rounded = false,
    thickness = 2,
    size = 10,
  },
  ref,
) {
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
            bgcolor: 'grey.400',
          },
          '&::after': {
            flexShrink: 0,
            content: '""',
            width: size,
            height: size,
            bgcolor: 'grey.400',
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
      ref={ref}
    />
  );
});
