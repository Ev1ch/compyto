import type { ReactNode } from 'react';

import type { Provider } from '@/store/domain';

export interface ProvidersProps {
  providers: Provider[];
  children: ReactNode;
}

export default function Providers({ providers, children }: ProvidersProps) {
  return providers.reduceRight(
    (providerChildren, Provider) => <Provider>{providerChildren}</Provider>,
    children,
  );
}
