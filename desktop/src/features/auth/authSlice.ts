import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AuthState {
  token: string,
  status: 'idle' | 'loading' | 'failed',
  isLoggedIn: boolean
}

const initialState: AuthState = {
  token: '',
  status: 'idle',
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state: AuthState) => {
      state.status = 'loading'
    },
    setIdle: (state: AuthState) => {
      state.status = 'idle'
    },
    setToken: (state: AuthState, action) => {
      state.token = String(action.payload.token);
      state.isLoggedIn = true;
    },
    logOut: (state: AuthState,) => {
      state.token = '';
      state.isLoggedIn = false;
    },
  },
});

export const { setToken, setIdle, setLoading, logOut } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
