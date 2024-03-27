import type { Provider } from 'contexts/domain';
import type { ReactNode } from 'react';

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
