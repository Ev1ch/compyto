import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { MonitoringEvent } from '@compyto/monitoring';
import type { State } from '@/store/domain';

import type {
  MonitoringEventsFilter,
  MonitoringEventsFilterCriteria,
  MonitoringEventsSort,
} from '../domain';
import {
  MONITORING_EVENTS_FILTER_CRITERION,
  MONITORING_EVENTS_SORT_FIELDS,
} from '../constants';
import {
  getMonitoringEventsWithPreparers,
  getValuesByMonitoringEventsFilterCriteria,
} from '../logic';
import getMonitoringEventsWithSorts from '../logic/preparers/getMonitoringEventsWithSorts';

export interface MonitoringState {
  events: MonitoringEvent[];
  showAll: boolean;
  filters: MonitoringEventsFilter[];
  search: string;
  sorts: MonitoringEventsSort[];
}

const selectRawEvents = (state: State) => state.monitoring.events;

export const selectEvents = createSelector([selectRawEvents], (events) =>
  events.map((event) => ({
    ...event,
    context: {
      ...event.context,
      emittedAt: new Date(event.context.emittedAt),
    },
  })),
);

export const selectEvent = createSelector(
  [selectEvents, (state, id: string) => id],
  (events, id) => events.find((event) => event.context.id === id),
);

export const selectSorts = (state: State) => state.monitoring.sorts;

export const selectFilters = (state: State) => state.monitoring.filters;

export const selectExistingCriterion = (state: State) =>
  state.monitoring.filters.map((filter) => filter.criteria);

export const selectAvailableCriterion = createSelector(
  [selectExistingCriterion],
  (existingCriterion) =>
    MONITORING_EVENTS_FILTER_CRITERION.filter(
      (criteria) => !existingCriterion.includes(criteria),
    ),
);

export const selectSearch = (state: State) => state.monitoring.search;

export const selectShowAll = (state: State) => state.monitoring.showAll;

export const selectExistingSortFields = createSelector([selectSorts], (sorts) =>
  sorts.map(({ field }) => field),
);

export const selectAvailableSortFields = createSelector(
  [selectExistingSortFields],
  (existingFields) =>
    MONITORING_EVENTS_SORT_FIELDS.filter(
      (field) => !existingFields.includes(field),
    ),
);

export const selectValuesByCriteria = createSelector(
  [selectEvents, (state, criteria: MonitoringEventsFilterCriteria) => criteria],
  (events, criteria) =>
    getValuesByMonitoringEventsFilterCriteria(events, criteria),
);

export const selectEventsWithPreparers = createSelector(
  [selectEvents, selectFilters, selectSearch, selectSorts],
  (events, filters, search, sorts) =>
    getMonitoringEventsWithPreparers(events, { search, filters, sorts }),
);

export const selectEventsWithSorts = createSelector(
  [selectEvents, selectSorts],
  (events, sorts) => getMonitoringEventsWithSorts(events, sorts),
);

export const selectIsEventUnfocused = createSelector(
  [selectEventsWithPreparers, (state, id) => id],
  (eventsWithPreparers, id) =>
    !eventsWithPreparers.some((event) => event.context.id === id),
);

export const selectShownEvents = createSelector(
  [selectEventsWithSorts, selectEventsWithPreparers, selectShowAll],
  (events, eventsWithPreparers, showAll) =>
    showAll ? events : eventsWithPreparers,
);

const initialState: MonitoringState = {
  events: [],
  filters: [],
  sorts: [],
  showAll: true,
  search: '',
};

const slice = createSlice({
  name: 'monitoring',
  initialState,
  reducers: {
    addEvent: (state, { payload }: PayloadAction<MonitoringEvent>) => {
      state.events.push({
        ...payload,
        context: {
          ...payload.context,
          // @ts-expect-error emittedAt is a string in Redux
          emittedAt: payload.context.emittedAt.toISOString(),
        },
      });
    },
    setEvents(state, { payload }: PayloadAction<MonitoringEvent[]>) {
      // @ts-expect-error emittedAt is a string in Redux
      state.events = payload.map((event) => ({
        ...event,
        context: {
          ...event.context,
          emittedAt: event.context.emittedAt.toISOString(),
        },
      }));
    },
    setShowAll: (state, { payload }: PayloadAction<boolean>) => {
      state.showAll = payload;
    },
    addEvents: (state, { payload }: PayloadAction<MonitoringEvent[]>) => {
      state.events.push(...payload);
    },
    removeEvent: (state, { payload }: PayloadAction<string>) => {
      state.events = state.events.filter(
        (event) => event.context.id !== payload,
      );
    },
    removeEvents: (state) => {
      state.events = [];
    },
    addFilter: (state, { payload }: PayloadAction<MonitoringEventsFilter>) => {
      state.filters.push(payload);
    },
    removeFilter: (state, { payload }: PayloadAction<string>) => {
      state.filters = state.filters.filter((filter) => filter.id !== payload);
    },
    removeFilters: (state) => {
      state.filters = [];
    },
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.search = payload;
    },
    removeSearch: (state) => {
      state.search = '';
    },
    addSort: (state, { payload }: PayloadAction<MonitoringEventsSort>) => {
      state.sorts.push(payload);
    },
    removeSort: (state, { payload }: PayloadAction<string>) => {
      state.sorts = state.sorts.filter((sort) => sort.id !== payload);
    },
    removeSorts: (state) => {
      state.sorts = [];
    },
  },
});

const { reducer, actions } = slice;
export const {
  addEvent,
  setShowAll,
  addEvents,
  removeEvent,
  removeEvents,
  addFilter,
  removeFilter,
  removeFilters,
  removeSearch,
  addSort,
  removeSort,
  removeSorts,
  setSearch,
  setEvents,
} = actions;
export default reducer;
