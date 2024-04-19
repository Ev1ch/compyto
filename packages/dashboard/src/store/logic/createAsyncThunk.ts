import { createAsyncThunk as createReduxAsyncThunk } from '@reduxjs/toolkit';

import type { Dispatch, State } from '../domain';

const createAsyncThunk = createReduxAsyncThunk.withTypes<{
  getState: () => State;
  dispatch: Dispatch;
}>();

export default createAsyncThunk;
