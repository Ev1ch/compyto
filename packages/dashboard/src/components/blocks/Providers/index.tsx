import type { ReactNode } from 'react';

import { StoreProvider } from '@/components/providers';
import { ConnectionContextProvider } from '@/modules/connections/components/providers';
import { ThemeProvider } from '@/styles/components/providers';

export interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return [ConnectionContextProvider, StoreProvider, ThemeProvider].reduceRight(
    (providerChildren, Provider) => <Provider>{providerChildren}</Provider>,
    children,
  );
}
