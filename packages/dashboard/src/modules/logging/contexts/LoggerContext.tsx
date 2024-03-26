import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type {
  MonitoringEvent,
  MonitoringEventContext,
  MonitoringEventWithContext,
} from '@compyto/monitoring';

const LoggerContext = createContext<{
  events: MonitoringEventWithContext[];
  addEvent: (event: MonitoringEvent, context: MonitoringEventContext) => void;
  removeEvent: (id: string) => void;
  removeEvents: () => void;
} | null>(null);

export function useLoggerContext() {
  const context = useContext(LoggerContext);

  if (!context) {
    throw new Error('useLoggerContext must be used within a LoggerProvider');
  }

  return context;
}

export interface LoggerProviderProps {
  readonly children: ReactNode;
}

export function LoggerProvider({ children }: LoggerProviderProps) {
  const [events, setEvents] = useState<MonitoringEventWithContext[]>([]);
  const value = useMemo(
    () => ({
      events,
      addEvent,
      removeEvent,
      removeEvents,
    }),
    [],
  );

  function addEvent(event: MonitoringEvent, context: MonitoringEventContext) {
    setEvents((prevState) => [...prevState, { event, context }]);
  }

  function removeEvents() {
    setEvents([]);
  }

  function removeEvent(id: string) {
    setEvents((prevState) =>
      prevState.filter((event) => event.context.id !== id),
    );
  }

  return (
    <LoggerContext.Provider value={value}>{children}</LoggerContext.Provider>
  );
}

export default LoggerContext;
