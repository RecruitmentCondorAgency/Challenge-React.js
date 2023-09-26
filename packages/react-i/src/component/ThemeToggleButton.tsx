
import { useTheme } from './ThemeProvider';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ${theme === 'dark' ? 'bg-gray-600' : ''}`}
      onClick={toggleTheme}
    >
      Cambiar Tema
    </button>
  );
};

export default ThemeToggleButton;