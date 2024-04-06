import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type {
  MonitoringEvent,
  MonitoringEventKeyScope,
  MonitoringEventKeyType,
} from '@compyto/monitoring';
import getRandomEvent from '@/getRandomEvent';

import type {
  MonitoringEventsFilter,
  MonitoringEventsFilterCriteria,
  MonitoringEventsSort,
} from '../domain';
import {
  getMonitoringEventsWithPreparers,
  getValuesByMonitoringEventsFilterCriteria,
} from '../logic';

interface Logger {
  events: MonitoringEvent[];
  addEvent: (event: MonitoringEvent) => void;
  removeEvent: (id: string) => void;
  removeEvents: () => void;

  filters: MonitoringEventsFilter[];
  addFilter: (filter: MonitoringEventsFilter) => void;
  removeFilter: (id: string) => void;
  removeFilters: () => void;
  getValuesByCriteria: (
    criteria: MonitoringEventsFilterCriteria,
  ) => MonitoringEventKeyType[] | MonitoringEventKeyScope[];

  search: string;
  setSearch: (search: string) => void;
  removeSearch: () => void;

  eventsWithPreparers: MonitoringEvent[];

  sorts: MonitoringEventsSort[];
  addSort: (sort: MonitoringEventsSort) => void;
  removeSort: (id: string) => void;
  removeSorts: () => void;
}

const LoggerContext = createContext<Logger | null>(null);

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
  const [events, setEvents] = useState<MonitoringEvent[]>(
    Array.from({ length: 40 }, getRandomEvent),
  );
  const [filters, setFilters] = useState<MonitoringEventsFilter[]>([]);
  const [search, setSearch] = useState('');
  const [sorts, setSorts] = useState<MonitoringEventsSort[]>([]);
  const eventsWithPreparers = useMemo(
    () => getMonitoringEventsWithPreparers(events, { filters, search, sorts }),
    [events, filters, search, sorts],
  );

  const addEvent = useCallback((event: MonitoringEvent) => {
    setEvents((prevState) => [...prevState, event]);
  }, []);

  const removeEvent = useCallback((id: string) => {
    setEvents((prevState) =>
      prevState.filter((event) => event.context.id !== id),
    );
  }, []);

  const removeEvents = useCallback(() => {
    setEvents([]);
  }, []);

  const addFilter = useCallback((filter: MonitoringEventsFilter) => {
    setFilters((prevState) => [...prevState, filter]);
  }, []);

  const removeFilter = useCallback((id: string) => {
    setFilters((prevState) => prevState.filter((filter) => filter.id !== id));
  }, []);

  const removeFilters = useCallback(() => {
    setFilters([]);
  }, []);

  const getValuesByCriteria = useCallback(
    (criteria: MonitoringEventsFilterCriteria) =>
      getValuesByMonitoringEventsFilterCriteria(events, criteria),
    [events],
  );

  const removeSearch = useCallback(() => {
    setSearch('');
  }, []);

  const addSort = useCallback((sort: MonitoringEventsSort) => {
    setSorts((prevState) => [...prevState, sort]);
  }, []);

  const removeSort = useCallback((id: string) => {
    setSorts((prevState) => prevState.filter((sort) => sort.id !== id));
  }, []);

  const removeSorts = useCallback(() => {
    setSorts([]);
  }, []);

  const value = useMemo<Logger>(
    () => ({
      events,
      addEvent,
      removeEvent,
      removeEvents,

      filters,
      addFilter,
      removeFilter,
      removeFilters,
      getValuesByCriteria,

      search,
      setSearch,
      removeSearch,

      eventsWithPreparers,

      sorts,
      addSort,
      removeSort,
      removeSorts,
    }),
    [
      events,
      addEvent,
      removeEvent,
      removeEvents,
      filters,
      addFilter,
      removeFilter,
      removeFilters,
      getValuesByCriteria,
      search,
      setSearch,
      removeSearch,
      eventsWithPreparers,
      sorts,
      addSort,
      removeSort,
      removeSorts,
    ],
  );

  return (
    <LoggerContext.Provider value={value}>{children}</LoggerContext.Provider>
  );
}

export default LoggerContext;
