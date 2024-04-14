import { Grid } from '@mui/material';
import type { ReactNode } from 'react';

export interface LayoutProps {
  readonly logger: ReactNode;
  readonly palette: ReactNode;
}

const fullHeightChildren = {
  '> *': {
    height: '100%',
  },
};

export default function Layout({ logger, palette }: LayoutProps) {
  return (
    <Grid
      sx={{
        height: '100vh',
        ...fullHeightChildren,
      }}
      columnSpacing={3}
      container
    >
      <Grid sx={fullHeightChildren} xs={9} item>
        {logger}
      </Grid>
      <Grid sx={fullHeightChildren} xs={3} item>
        {palette}
      </Grid>
    </Grid>
  );
}
