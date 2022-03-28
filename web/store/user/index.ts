import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import thunkReducers from './thunks'
import { SelectedUniversity, University, User, UserState } from './types'

const initialState: UserState = {
  user: null,
  universities: [],
  university: null,
  loading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = state.user ? {...state.user, ...action.payload}: null
    },
    setUniversities: (state, action: PayloadAction<SelectedUniversity[]>) => {
      state.universities =  action.payload
    },
    setUniversity: (state, action: PayloadAction<SelectedUniversity>) => {
      state.university =  action.payload
    }
  },
  extraReducers: (builder) => thunkReducers(builder)
})

export const { setUser, updateUser, setUniversities, setUniversity } = userSlice.actions

export default userSlice.reducer