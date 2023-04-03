import { createSlice } from "@reduxjs/toolkit";
import { Payload, User } from "../types";

export const authSlice = createSlice({
  name: 'auth',
  initialState: cleanAuth(JSON.parse(localStorage.getItem('auth-user') || 'null')),
  reducers: {
    login(state, action: Payload<User>) {
      // return the current value if already logged, otherwise save the new value
      return state || updateStorage(action.payload);
    },
    logout() {
      return updateStorage();
    },
    updateAuth(state, action: Payload<Partial<User>>) {
      return updateStorage({...state, ...action.payload});
    },
  },
});

function updateStorage<T extends User>(user: T): User;
function updateStorage(user?: unknown): null;
function updateStorage(user?: unknown): User | null {
  const auth = cleanAuth(user);
  if (auth) {
    localStorage.setItem('auth-user', JSON.stringify(auth));
  } else {
    localStorage.removeItem('auth-user');
  }
  return auth;
}

// remove unnecesary and/or secure data (for example: id, password)
function cleanAuth(user?: unknown) {
  if (!validUser(user)) return null;
  return (({id, email, universities: u}): User => ({id, email, universities: u || []}))(user);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validUser(obj: any): obj is User {
  return Boolean(obj?.id && obj?.email && obj?.universities instanceof Array);
}
