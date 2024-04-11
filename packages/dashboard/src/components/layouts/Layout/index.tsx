import { Grid } from '@mui/material';
import type { ReactNode } from 'react';

export interface LayoutProps {
  readonly logger: ReactNode;
}

const fullHeightChildren = {
  '> *': {
    height: '100%',
  },
};

export default function Layout({ logger }: LayoutProps) {
  return (
    <Grid
      sx={{
        height: '100vh',
        ...fullHeightChildren,
      }}
      columnSpacing={3}
      container
    >
      <Grid sx={fullHeightChildren} xs={12} item>
        {logger}
      </Grid>
    </Grid>
  );
}
