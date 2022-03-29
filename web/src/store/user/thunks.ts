import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import {setUniversities, setUser } from '.';
import type { RootState } from '..';
import {users} from '../../services'
import { PatchUser, SelectedUniversity, University, User, UserState } from './types';

export const fetchLogin = createAsyncThunk<any, {email: string, password: string}>(
  "users/login", async (data ,thunkAPI) => {
     try {
        const response = await users.getUser(data)
        let result: User & {universities: University[]} = response.data[0]
        if (result) {
          const {universities, ...user} = result
          thunkAPI.dispatch(setUser(user))
          thunkAPI.dispatch(setUniversities(universities))
        }
        return result
      } catch (error) {
        return thunkAPI.rejectWithValue({ error });
      }
});

export const fetchPost = createAsyncThunk<any, Omit<User, 'id'>>(
  "users/post", async (data ,thunkAPI) => {
     try {
        const response = await users.postUser(data)
        return response.data[0] ?? null
      } catch (error) {
         return thunkAPI.rejectWithValue({ error });
      }
});

export const fetchUpdate = createAsyncThunk<any, Partial<User>>(
  "users/patch", async (data ,thunkAPI) => {
    try {
      return await patchUser(data ,thunkAPI)
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
});

export const fetchPostUniversities = createAsyncThunk<any, Required<SelectedUniversity>>(
  "universities/patch", async (data, thunkAPI) => {
    try {
      const {userReducer} = thunkAPI.getState() as RootState
      const {universities} = userReducer
      const hasItem = universities.some(item => item.name === data.name)
      let newList = hasItem ?
        universities.filter(item => item.name !== data.name) :
        [...universities, data]
      const response = await patchUser({universities: newList}, thunkAPI)
      if (response) {
        thunkAPI.dispatch(setUniversities(response.universities))
      }
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
});

const patchUser = async (data: Partial<User & {universities: University[]}> | null, thunkAPI: any) => {
  const {userReducer} = thunkAPI.getState() as RootState
  let result: Required<PatchUser> | null = null
  if (userReducer.user && data) {
    const response = await users.patchUser(userReducer.user.id, data)
    result = response.data
  }

  return result
}

const thunkReducers = (builder: ActionReducerMapBuilder<UserState>) => {
  // Add reducers for additional action types here, and handle loading state as needed
  builder.addCase(fetchLogin.pending, (state, action) => {
    state.loading = true
  })
  builder.addCase(fetchLogin.fulfilled, (state, action) => {
    state.loading = false
  })
}

export default thunkReducers