import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AuthState {
  token: string,
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  token: '',
  status: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state: AuthState, action) => {
      console.log('from slice', action.payload.token);
      state.token = String(action.payload.token);
    },
  },
});

export const { setToken } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
