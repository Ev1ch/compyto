import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

import type { State } from '@/store/domain';

import { SortOrder, type Sort } from '../domain';
import { SORT_FIELDS } from '../constants';
import { createSort } from '../logic';

export interface SortingState {
  sorts: Sort[];
}

export const selectSorts = (state: State) => state.sorting.sorts;

export const selectExistingSortFields = createSelector([selectSorts], (sorts) =>
  sorts.map(({ field }) => field),
);

export const selectAvailableSortFields = createSelector(
  [selectExistingSortFields],
  (existingFields) =>
    SORT_FIELDS.filter((field) => !existingFields.includes(field)),
);

const initialState: SortingState = {
  sorts: [createSort('event.context.emittedAt', SortOrder.ASCENDING)],
};

const slice = createSlice({
  name: 'sorting',
  initialState,
  reducers: {
    addSort: (state, { payload }: PayloadAction<Sort>) => {
      state.sorts.push(payload);
    },
    removeSort: (state, { payload }: PayloadAction<string>) => {
      state.sorts = state.sorts.filter((sort) => sort.id !== payload);
    },
    removeSorts: (state) => {
      state.sorts = [];
    },
    setSorts: (state, { payload }: PayloadAction<Sort[]>) => {
      state.sorts = payload;
    },
  },
});

const { reducer, actions } = slice;
export const { addSort, removeSort, removeSorts } = actions;
export default reducer;
