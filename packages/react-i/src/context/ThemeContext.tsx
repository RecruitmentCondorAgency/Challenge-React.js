import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getInitialTheme, persistTheme } from "../utils/themepersistence";

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

const defaultContextData: ThemeContextProps = {
  theme: "light",
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextProps>(defaultContextData);

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState(getInitialTheme());

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    const htmlElement = document.documentElement;

    if (newTheme === "dark") {
      htmlElement.setAttribute("data-bs-theme", "dark");
    } else {
      htmlElement.setAttribute("data-bs-theme", theme);
    }
    setTheme(newTheme);
    persistTheme(newTheme);
  }, [theme]);

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (theme === "dark") {
      htmlElement.setAttribute("data-bs-theme", "dark");
    } else {
      htmlElement.setAttribute("data-bs-theme", theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
