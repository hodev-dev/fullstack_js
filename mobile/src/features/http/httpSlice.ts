import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface HttpState {
  server: string,
  status: 'idle' | 'loading' | 'failed';
  CSRF_TOKEN: string,
  access_token: string
}

const initialState: HttpState = {
  server: '',
  status: 'idle',
  CSRF_TOKEN: "",
  access_token: ''
};

export const httpSlice = createSlice({
  name: 'http',
  initialState,
  reducers: {
    setServer: (state: HttpState, action) => {
      console.log('payload', action.payload);
      state.server = String(action.payload.server);
    },
    setCSRF: (state: HttpState, action) => {
      state.CSRF_TOKEN = String(action.payload.CSRF_TOKEN);
    },
    setAccessToken: (state: HttpState, action) => {
      state.access_token = String(action.payload.access_token);
    }
  },
});

export const { setServer, setCSRF, setAccessToken } = httpSlice.actions;

export const selectHttp = (state: RootState) => state.http;

export default httpSlice.reducer;
