import { Action, combineReducers, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit';
import { createTransform, FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';
import counterReducer from '../features/counter/counterSlice';
import httpReducer from '../features/http/httpSlice';

export const JSOGTransform = createTransform(
  (inboundState, key) => JSON.stringify(inboundState),
  (outboundState, key) => JSON.parse(outboundState),
);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["auth", 'http'], // only navigation will be persisted
  transforms: [JSOGTransform]
};

const reducers = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  http: httpReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
