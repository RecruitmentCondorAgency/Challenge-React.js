import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { User, Credentials } from "../types/user";
import { useToast } from "./ToastContext";
import { toastType } from "../types/enums";
import { loginUserAPI, validateUserAPI } from "../api/utils";

interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => void;
  logout: () => void;
  modifyUser: (user: User) => void;
  isAuthResolved: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const publicRoutes = ["/login", "/register"];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const [isAuthResolved, setAuthResolved] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (isAuthResolved) {
      if (user && publicRoutes.includes(location?.pathname)) {
        navigate("/");
      } else if (!user && !publicRoutes.includes(location?.pathname)) {
        navigate("/login");
      }
    }
  }, [location.pathname, user, isAuthResolved]);

  const fetchUserData = async () => {
    const userId = localStorage.getItem("user");
    if (!userId) {
      setAuthResolved(true);
      return;
    }
    const userData = await validateUserAPI(userId);

    if (userData) {
      setUser(userData);
      setAuthResolved(true);
    } else {
      localStorage.clear();
      setAuthResolved(true);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const login = useCallback(
    async (credentials: Credentials) => {
      const user = await loginUserAPI(credentials);
      if (user) {
        localStorage.setItem("user", user.id);
        setUser(user);
      } else {
        showToast(toastType.error, "Invalid credentials");
      }
    },
    [showToast]
  );

  const modifyUser = useCallback((newUser: User) => {
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, modifyUser, isAuthResolved }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
