import type { ContextProviderProps } from '@/components/providers';
import { ConnectionContext } from '@/modules/connections/contexts';

import { useConnectionContextLogic } from '../../../hooks';

export default function ConnectionContextProvider({
  children,
}: ContextProviderProps) {
  const value = useConnectionContextLogic();

  return (
    <ConnectionContext.Provider value={value}>
      {children}
    </ConnectionContext.Provider>
  );
}
