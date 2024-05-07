import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { MonitoringData } from '@compyto/monitoring';
import type { FilterCriteria } from '@/modules/filtering/domain';
import type { State } from '@/store/domain';
import {
  getDefaultValuesByFilterCriteria,
  getValuesByFilterCriteria,
} from '@/modules/filtering/logic';
import {
  selectFilters,
  selectSearch,
  selectShowAll,
} from '@/modules/filtering/store';
import { getMonitoringEventsWithSorts } from '@/modules/sorting/logic';
import { selectSorts } from '@/modules/sorting/store';

import {
  getMonitoringEventsWithPreparers,
  getProcessKeyByMonitoring,
} from '../logic';

export interface MonitoringsState {
  data: Partial<Record<string, MonitoringData>>;
}

export const selectData = (state: State) => state.monitorings.data;

export const selectMonitorings = createSelector(
  [selectData],
  (data) => Object.values(data) as MonitoringData[],
);

export const selectEventWithContexts = createSelector(
  [selectMonitorings],
  (monitorings) =>
    monitorings
      .map(({ events, context }) =>
        events.map((event) => ({
          event,
          context,
        })),
      )
      .flat(),
);

export const selectEventWithContext = createSelector(
  [selectEventWithContexts, (state, id: string) => id],
  (eventWithContexts, id) =>
    eventWithContexts.find(({ event }) => event.context.id === id),
);

export const selectValuesByCriteria = createSelector(
  [selectEventWithContexts, (state, criteria: FilterCriteria) => criteria],
  (eventWithContexts, criteria) =>
    eventWithContexts.length
      ? getValuesByFilterCriteria(eventWithContexts, criteria)
      : getDefaultValuesByFilterCriteria(criteria),
);

export const selectEventsWithPreparers = createSelector(
  [selectEventWithContexts, selectFilters, selectSearch, selectSorts],
  (eventWithContexts, filters, search, sorts) =>
    getMonitoringEventsWithPreparers(eventWithContexts, {
      search,
      filters,
      sorts,
    }),
);

export const selectEventsWithSorts = createSelector(
  [selectEventWithContexts, selectSorts],
  (eventWithContexts, sorts) =>
    getMonitoringEventsWithSorts(eventWithContexts, sorts),
);

export const selectIsEventUnfocused = createSelector(
  [selectEventsWithPreparers, (state, id) => id],
  (eventsWithPreparers, id) =>
    !eventsWithPreparers.some(({ event }) => event.context.id === id),
);

export const selectShownEvents = createSelector(
  [selectEventsWithSorts, selectEventsWithPreparers, selectShowAll],
  (events, eventsWithPreparers, showAll) =>
    showAll ? events : eventsWithPreparers,
);

const initialState: MonitoringsState = {
  data: {},
};

const slice = createSlice({
  name: 'monitoring',
  initialState,
  reducers: {
    addProcess: (state, { payload }: PayloadAction<MonitoringData>) => {
      const key = getProcessKeyByMonitoring(payload);

      state.data[key] = payload;
    },
    addProcesses: (state, { payload }: PayloadAction<MonitoringData[]>) => {
      payload.forEach((process) => {
        const key = getProcessKeyByMonitoring(process);

        state.data[key] = process;
      });
    },
    removeProcesses: (state) => {
      state.data = {};
    },
  },
});

const { reducer, actions } = slice;
export const { addProcess, addProcesses, removeProcesses } = actions;
export default reducer;
