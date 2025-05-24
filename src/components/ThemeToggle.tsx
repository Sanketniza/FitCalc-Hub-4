import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-slate-700 dark:hover:bg-slate-600 focus:outline-none transition-colors text-slate-800 dark:text-white"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun size={20} className="text-yellow-300" />
      ) : (
        <Moon size={20} className="text-slate-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
