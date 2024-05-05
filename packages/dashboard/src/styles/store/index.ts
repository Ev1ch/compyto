import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { State } from '@/store/domain';

import { Mode } from '../domain';

export interface StylingState {
  mode: Mode;
}

export const selectMode = (state: State) => state.styling.mode;

const initialState = {
  mode: Mode.LIGHT,
};

const slice = createSlice({
  name: 'styling',
  initialState,
  reducers: {
    setMode: (state, { payload }: PayloadAction<Mode>) => {
      state.mode = payload;
    },
  },
});

const { reducer, actions } = slice;
export const { setMode } = actions;
export default reducer;
