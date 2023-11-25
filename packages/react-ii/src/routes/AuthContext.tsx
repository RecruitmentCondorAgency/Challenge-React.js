import * as React from 'react';
import { createContext, ReactNode, useState } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    loginContext: (token: string) => void;
    logoutContext: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    loginContext: (token: string) => { },
    logoutContext: () => { },
});

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedToken = localStorage.getItem('token');
        return !!storedToken;
    });

    const loginContext = (token: string) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logoutContext = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginContext, logoutContext }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
