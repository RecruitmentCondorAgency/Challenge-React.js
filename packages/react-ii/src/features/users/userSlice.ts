import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types/user'

interface UsersState {
  user: User
}

const initialState: UsersState = {
  user: {} as User,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUser: (state) => {
      state.user = {} as User
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
})

export const { removeUser, setUser } = userSlice.actions

export default userSlice.reducer