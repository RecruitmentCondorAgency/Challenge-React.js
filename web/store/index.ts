import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { authSlice } from "./auth";
import { User } from "../types";

interface State {
  auth: User;
}

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export function useStore<T>(fn: (state: State) => T) {
  return useSelector(fn);
}

const { login, logout, updateAuth } = authSlice.actions;

export const actions = {
  login,
  logout,
  updateAuth,
};

export default store;
