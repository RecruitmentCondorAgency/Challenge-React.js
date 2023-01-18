import { createContext, useReducer } from 'react';
import authReducer, { initialState } from '../reducers/user';

const AuthContext = createContext({
  state: initialState,
  dispatch: {}
});

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
