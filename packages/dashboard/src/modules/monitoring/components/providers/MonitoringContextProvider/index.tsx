import type { ContextProviderProps } from '@/components/providers';

import { MonitoringContext } from '../../../contexts';
import { useMonitoringContextLogic } from '../../../hooks';

export default function MonitoringContextProvider({
  children,
}: ContextProviderProps) {
  const value = useMonitoringContextLogic();

  return (
    <MonitoringContext.Provider value={value}>
      {children}
    </MonitoringContext.Provider>
  );
}
