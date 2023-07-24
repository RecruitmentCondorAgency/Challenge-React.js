const { configureStore } = require('@reduxjs/toolkit')
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import userReducer from './UserSlice'

persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
}

const rootReducer = combineReducers({
  user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: {
    user: persistedReducer,
    middleware: [thunk],
  },
})

export default store
