import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createId } from '@compyto/utils';
import type { State } from '@/store/domain';
import { selectShownEvents } from '@/modules/monitoring/store';
import createAsyncThunk from '@/store/logic/createAsyncThunk';

import type { Pair, Position } from '../domain';

export interface AnalysisState {
  pair: Pair | null;
  positions: Position[];
}

const initialState: AnalysisState = {
  pair: null,
  positions: [],
};

export const selectPair = (state: State) => state.analysis.pair;

export const selectIsPairPresent = createSelector(
  [selectPair],
  (pair) => !!pair,
);

export const selectPairEventIds = createSelector(
  [selectPair],
  (pair) => pair?.eventIds ?? [],
);

export const selectPositions = (state: State) => state.analysis.positions;

export const selectPosition = createSelector(
  [selectPositions, (state, id: string) => id],
  (positions, id) => positions.find((position) => position.id === id),
);

export const selectPositionIndex = createSelector(
  [selectPositions, selectPosition],
  (positions, position) => positions.findIndex((p) => p.id === position?.id),
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
  [selectPairEventIds, (state, id: string) => id],
  (events, id) => events.includes(id),
);

export const addEventToPair = createAsyncThunk(
  'analysis/addEventToPair',
  (event: string, { getState, dispatch }) => {
    // @ts-expect-error - ???
    const pair = selectPair(getState());
    // @ts-expect-error - ???
    const shownEvents = selectShownEvents(getState());

    if (!pair) {
      dispatch(
        setPair({
          id: createId(),
          eventIds: [event],
        }),
      );
      return;
    }

    const eventIds = [...pair.eventIds, event].sort((a, b) => {
      const aIndex = shownEvents.findIndex(
        (shownEvent) => shownEvent.context.id === a,
      );
      const bIndex = shownEvents.findIndex(
        (shownEvent) => shownEvent.context.id === b,
      );

      return aIndex - bIndex;
    });

    dispatch(
      setPair({
        ...pair,
        eventIds,
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

      const eventIds = state.pair.eventIds.filter((event) => event !== payload);

      if (!eventIds.length) {
        state.pair = null;
        return;
      }

      state.pair = {
        ...state.pair,
        eventIds,
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
