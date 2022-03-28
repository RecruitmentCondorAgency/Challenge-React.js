import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import searchReducer from './search'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { UserState } from './user/types'
import { SearchState } from './search/types'

const rootReducer = combineReducers({
  userReducer: persistReducer({
    key: 'userReducer',
    blacklist: ['selected'],
    storage
  }, userReducer),
  searchReducer
})

export const store = configureStore({
  reducer: persistReducer(
    {
      key: 'root',
      blacklist: ['searchReducer'],
      storage
    },
    rootReducer
  ),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export interface RootState {
  userReducer: UserState
  searchReducer: SearchState
}
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store);