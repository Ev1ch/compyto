import { Unstable_Grid2 } from '@mui/material';
import type { ReactNode } from 'react';

export interface LayoutProps {
  logger: ReactNode;
}

export default function Layout({ logger }: LayoutProps) {
  return (
    <Unstable_Grid2 sx={{ height: '100vh' }} container>
      <Unstable_Grid2 xs={4}>{logger}</Unstable_Grid2>
      <Unstable_Grid2 xs={8}></Unstable_Grid2>
    </Unstable_Grid2>
  );
}
