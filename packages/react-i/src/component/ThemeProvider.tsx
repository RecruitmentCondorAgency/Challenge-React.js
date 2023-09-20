
import  { createContext, useState, useEffect, useContext, PropsWithChildren } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  toggleTheme: () => {},
});

const ThemeProvider: React.FC<PropsWithChildren> = ( {children} ) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDarkTheme ? 'dark' : 'light');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
     
      <body className={`app ${theme}`}>
      
        {children}
      </body>
      
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => useContext(ThemeContext);

export default ThemeProvider;