import { useCallback, useMemo, useState } from 'react';

import { MonitoringEvent } from '@compyto/monitoring';
import getRandomEvent from '@/getRandomEvent';

import type {
  MonitoringEventsFilter,
  MonitoringEventsFilterCriteria,
  MonitoringEventsSort,
} from '../domain';
import type { MonitoringContextProps } from '../contexts';
import {
  getMonitoringEventsWithPreparers,
  getValuesByMonitoringEventsFilterCriteria,
} from '../logic';

export default function useMonitoringContextLogic() {
  const [events, setEvents] = useState<MonitoringEvent[]>(
    Array.from({ length: 40 }, getRandomEvent),
  );
  const [filters, setFilters] = useState<MonitoringEventsFilter[]>([]);
  const [search, setSearch] = useState('');
  const [sorts, setSorts] = useState<MonitoringEventsSort[]>([]);
  const [showAll, setShowAll] = useState(false);
  const eventsWithPreparers = useMemo(
    () => getMonitoringEventsWithPreparers(events, { filters, search, sorts }),
    [events, filters, search, sorts],
  );

  const addEvent = useCallback((event: MonitoringEvent) => {
    setEvents((prevState) => [...prevState, event]);
  }, []);

  const addEvents = useCallback((events: MonitoringEvent[]) => {
    setEvents((prevState) => [...prevState, ...events]);
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

  return useMemo<MonitoringContextProps>(
    () => ({
      events,
      addEvent,
      addEvents,
      removeEvent,
      removeEvents,

      showAll,
      setShowAll,

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
      addEvents,
      removeEvent,
      removeEvents,
      showAll,
      setShowAll,
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
}
