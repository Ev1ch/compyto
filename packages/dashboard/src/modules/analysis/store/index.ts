import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { MonitoringEvent } from '@compyto/monitoring';
import { createId } from '@compyto/utils';
import type { State } from '@/store/domain';
import { selectShownEvents } from '@/modules/monitoring/store';
import createAsyncThunk from '@/store/logic/createAsyncThunk';

import type { Pair, Position } from '../domain';

export interface AnalysisContextProps {
  pair: Pair | null;
  positions: Position[];
}

const initialState: AnalysisContextProps = {
  pair: null,
  positions: [],
};

export const selectPair = (state: State) => state.analysis.pair;

export const selectPairEvents = createSelector(
  [selectPair],
  (pair) => pair?.events || [],
);

export const selectPositions = (state: State) => state.analysis.positions;

export const selectPosition = createSelector(
  [selectPositions, (state, id: string) => id],
  (positions, id) => positions.find((position) => position.id === id),
);

export const selectPreviousPosition = createSelector(
  [selectPositions, selectPosition],
  (positions, position) => {
    const index = positions.findIndex((p) => p.id === position?.id);

    if (index <= 0) {
      return null;
    }

    return positions[index - 1];
  },
);

export const selectNextPosition = createSelector(
  [selectPositions, selectPosition],
  (positions, position) => {
    const index = positions.findIndex((p) => p.id === position?.id);

    if (index === -1 || index === positions.length - 1) {
      return null;
    }

    return positions[index + 1];
  },
);

export const selectIsEventSelected = createSelector(
  [selectPairEvents, (state, id: string) => id],
  (events, id) => events.some((event) => event.context.id === id),
);

export const addEventToPair = createAsyncThunk(
  'analysis/addEventToPair',
  (event: MonitoringEvent, { getState, dispatch }) => {
    const pair = selectPair(getState());
    const shownEvents = selectShownEvents(getState());

    if (!pair) {
      dispatch(
        setPair({
          id: createId(),
          events: [event],
        }),
      );
      return;
    }

    const events = [...pair.events, event].sort((a, b) => {
      const aIndex = shownEvents.findIndex(
        (shownEvent) => shownEvent.context.id === a.context.id,
      );
      const bIndex = shownEvents.findIndex(
        (shownEvent) => shownEvent.context.id === b.context.id,
      );

      return aIndex - bIndex;
    });

    dispatch(
      setPair({
        ...pair,
        events,
      }),
    );
  },
);

export const removeEventsFromPair = createAsyncThunk(
  'analysis/removeEventsFromPair',
  (ids: string[], { dispatch }) => {
    ids.forEach((id) => dispatch(removeEventFromPair(id)));
  },
);

const slice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    removePair: (state) => {
      state.pair = null;
    },

    setPair(state, { payload }: PayloadAction<Pair>) {
      state.pair = payload;
    },

    removeEventFromPair: (state, { payload }: PayloadAction<string>) => {
      if (!state.pair) {
        state.pair = null;
        return;
      }

      const events = state.pair.events.filter(
        (event) => event.context.id !== payload,
      );

      if (events.length === 0) {
        state.pair = null;
        return;
      }

      state.pair = {
        ...state.pair,
        events,
      };
    },

    updatePosition: (state, { payload }: PayloadAction<Position>) => {
      const isExistingEvent = state.positions.some(
        (position) => position.id === payload.id,
      );

      if (!isExistingEvent) {
        state.positions.push(payload);
        return;
      }

      state.positions = state.positions.map((position) => {
        if (position.id === payload.id) {
          return payload;
        }

        return position;
      });
    },

    removePosition: (state, { payload }: PayloadAction<string>) => {
      state.positions = state.positions.filter(
        (position) => position.id !== payload,
      );
    },
  },
});

const { actions, reducer } = slice;
export const {
  removePair,
  setPair,
  removeEventFromPair,
  updatePosition,
  removePosition,
} = actions;
export default reducer;
