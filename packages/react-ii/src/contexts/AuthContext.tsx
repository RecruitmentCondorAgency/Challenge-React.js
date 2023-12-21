import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { User, Credentials } from '../types/user';
import { useToast } from './ToastContext';
import { toastType } from '../types/enums';
import { loginUserAPI, validateUserAPI } from '../api/utils';

// Interface for the AuthContext
interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => void;
  logout: () => void;
  modifyUser: (user: User) => void;
  isAuthResolved: boolean;
}

// Create a context for Auth
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// List of public routes that do not require authentication
const publicRoutes = ['/login', '/signup'];

// AuthProvider component to manage user authentication
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const [isAuthResolved, setAuthResolved] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Effect to handle route redirection based on authentication status
  useEffect(() => {
    if (isAuthResolved) {
      if (user && publicRoutes.includes(location?.pathname)) {
        navigate('/');
      } else if (!user && !publicRoutes.includes(location?.pathname)) {
        navigate('/login');
      }
    }
  }, [location.pathname, user, isAuthResolved]);

  // Fetch user data from the server to validate authentication
  const fetchUserData = async () => {
    const userId = localStorage.getItem('user');

    // Check if user is already logged in
    if (!userId) {
      setAuthResolved(true);
      return;
    }

    try {
      const userData = await validateUserAPI(userId);

      if (userData) {
        setUser(userData);
        setAuthResolved(true);
      }
    } catch (err) {
      // Handle errors, clear local storage, and redirect to login on validation failure
      localStorage.clear();
      setAuthResolved(true);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Function to handle user login
  const login = useCallback(
    async (credentials: Credentials) => {
      try {
        const user = await loginUserAPI(credentials);

        if (user) {
          localStorage.setItem('user', user.id);
          setUser(user);
          navigate('/');
        } else {
          showToast(toastType.error, 'Invalid credentials');
        }
      } catch (err) {
        showToast(toastType.error, err.message);
      }
    },
    [showToast, navigate]
  );

  // Function to modify the user object in the state
  const modifyUser = useCallback((newUser: User) => {
    setUser(newUser);
  }, []);

  // Function to handle user logout
  const logout = useCallback(() => {
    localStorage.clear();
    setUser(null);
    navigate('/login');
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, modifyUser, isAuthResolved }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
