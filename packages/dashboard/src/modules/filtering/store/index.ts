import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { State } from '@/store/domain';

import type { Filter } from '../domain';
import { FILTER_CRITERION } from '../constants';

export interface FilteringState {
  showAll: boolean;
  filters: Filter[];
  search: string;
}

export const selectFilters = (state: State) => state.filtering.filters;

export const selectExistingCriterion = (state: State) =>
  state.filtering.filters.map((filter) => filter.criteria);

export const selectAvailableCriterion = createSelector(
  [selectExistingCriterion],
  (existingCriterion) =>
    FILTER_CRITERION.filter(
      (criteria) => !existingCriterion.includes(criteria),
    ),
);

export const selectSearch = (state: State) => state.filtering.search;

export const selectShowAll = (state: State) => state.filtering.showAll;

const initialState: FilteringState = {
  filters: [],
  showAll: true,
  search: '',
};

const slice = createSlice({
  name: 'filtering',
  initialState,
  reducers: {
    setShowAll: (state, { payload }: PayloadAction<boolean>) => {
      state.showAll = payload;
    },
    addFilter: (state, { payload }: PayloadAction<Filter>) => {
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
  },
});

const { reducer, actions } = slice;
export const {
  setShowAll,
  addFilter,
  removeFilter,
  removeFilters,
  removeSearch,
  setSearch,
} = actions;
export default reducer;
