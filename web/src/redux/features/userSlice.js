import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('userState')) || {
  user: null,
  accessToken: null,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    logout: (state) => {
      localStorage.setItem('userState', null);
      state.user = null;
      state.accessToken = null;
    },
    setUser: (state, action) => {
      localStorage.setItem(
        'userState',
        JSON.stringify({
          user: action.payload.user,
          accessToken: state.accessToken,
        })
      );
      state.user = action.payload.user;
    },
    login: (state, action) => {
      localStorage.setItem('userState', JSON.stringify(action.payload));
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser, login, toggleUniversity } = userSlice.actions;
