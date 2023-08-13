import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/user';

export interface userState {
  user: Omit<User, 'password'>;
}

const initialState: userState = {
  user: {
    id: 0,
    email: '',
    universities: [],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { resetUser, saveUser } = userSlice.actions;

export default userSlice.reducer;
