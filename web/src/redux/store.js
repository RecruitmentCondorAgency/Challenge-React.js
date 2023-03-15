import { configureStore } from '@reduxjs/toolkit';
import {
  createStateSyncMiddleware,
  initMessageListener,
} from 'redux-state-sync';

import { authApi } from './services/auth';
import { userApi } from './services/user';
import { countryApi } from './services/country';
import { weatherApi } from './services/weather';
import { universityApi } from './services/university';
import userReducer from './features/userSlice';

const reducers = {
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  userState: userReducer,
  [countryApi.reducerPath]: countryApi.reducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
  [universityApi.reducerPath]: universityApi.reducer,
};

const middlewares = [
  createStateSyncMiddleware({
    broadcastChannelOption: { type: 'localstorage' },
  }),
  authApi.middleware,
  userApi.middleware,
  countryApi.middleware,
  weatherApi.middleware,
  universityApi.middleware,
];

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

initMessageListener(store);
