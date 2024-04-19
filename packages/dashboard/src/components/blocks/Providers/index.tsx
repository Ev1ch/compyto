import type { ReactNode } from 'react';

import { StoreProvider } from '@/components/providers';
import { ConnectionContextProvider } from '@/modules/connections/components/providers';

export interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return [ConnectionContextProvider, StoreProvider].reduceRight(
    (providerChildren, Provider) => <Provider>{providerChildren}</Provider>,
    children,
  );
}
