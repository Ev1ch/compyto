import { createContext } from 'react';

import type {
  MonitoringEvent,
  MonitoringEventKeyScope,
  MonitoringEventKeyType,
} from '@compyto/monitoring';

import type {
  MonitoringEventsFilter,
  MonitoringEventsFilterCriteria,
  MonitoringEventsSort,
} from '../domain';

export interface MonitoringContextProps {
  events: MonitoringEvent[];
  addEvent: (event: MonitoringEvent) => void;
  addEvents: (events: MonitoringEvent[]) => void;
  removeEvent: (id: string) => void;
  removeEvents: () => void;

  showAll: boolean;
  setShowAll: (showAll: boolean) => void;

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

const MonitoringContext = createContext<MonitoringContextProps | null>(null);

export default MonitoringContext;
