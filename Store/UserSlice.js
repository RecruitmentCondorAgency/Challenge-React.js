import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const BASE_URL = 'http://localhost:3000'

export const signUpUser = createAsyncThunk(
  'user/signup',
  async (userCredentials, thunkAPI) => {
    const request = await axios.post(`${BASE_URL}/users`, userCredentials)
    const response = await request.data
    localStorage.setItem('user', JSON.stringify(response))
    return response
  },
)

export const loginUser = createAsyncThunk(
  'user/login',
  async (userCredentials, thunkAPI) => {
    const request = await axios.get(
      `${BASE_URL}/users?name=${userCredentials.name}`,
    )
    const response = await request.data
    if (!response) {
      throw new Error('User not found')
    }
    localStorage.setItem('user', JSON.stringify(response))
    return response
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
    })
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false
      if (action.error.message === 'Request failed with status code 401') {
        state.error = 'Access Denied Invalid Credentials'
      } else {
        state.error = action.error.message
      }
    })
    builder.addCase(signUpUser.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
    })
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.loading = false
      if (action.error.message === 'Request failed with status code 401') {
        state.error = 'Access Denied Invalid Credentials'
      } else {
        state.error = action.error.message
      }
    })
  },
})

export default userSlice.reducer
