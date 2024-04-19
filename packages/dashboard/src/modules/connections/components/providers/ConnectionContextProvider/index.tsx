import type { ProviderProps } from '@/components/providers';
import { ConnectionContext } from '@/modules/connections/contexts';

import { useConnectionContextLogic } from '../../../hooks';

export default function ConnectionContextProvider({ children }: ProviderProps) {
  const value = useConnectionContextLogic();

  return (
    <ConnectionContext.Provider value={value}>
      {children}
    </ConnectionContext.Provider>
  );
}
