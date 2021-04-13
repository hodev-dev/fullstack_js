import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface HttpState {
  server: string,
  status: 'idle' | 'loading' | 'failed';
}

const initialState: HttpState = {
  server: '',
  status: 'idle',
};

export const httpSlice = createSlice({
  name: 'http',
  initialState,
  reducers: {
    setServer: (state: HttpState, action) => {
      state.server = String(action.payload.server);
    }
  },
});

export const { setServer } = httpSlice.actions;

export const selectHttp = (state: RootState) => state.http;

export default httpSlice.reducer;
