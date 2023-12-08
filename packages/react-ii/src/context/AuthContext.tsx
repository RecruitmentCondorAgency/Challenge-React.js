import * as React from 'react';
import { createContext, ReactNode, useState } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  loginCtx: (token: string) => void;
  logoutCtx: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  loginCtx: (token: string) => {},
  logoutCtx: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return !!storedToken;
  });

  const loginCtx = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logoutCtx = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginCtx, logoutCtx }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
