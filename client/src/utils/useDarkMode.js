import { useState, useEffect } from 'react';

export const useDarkMode = () => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'system';
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateDarkMode = () => {
      let shouldBeDark;

      if (theme === 'system') {
        shouldBeDark = mediaQuery.matches;
      } else {
        shouldBeDark = theme === 'dark';
      }

      setIsDark(shouldBeDark);

      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Initial update
    updateDarkMode();

    // Listen for system theme changes only if theme is 'system'
    if (theme === 'system') {
      mediaQuery.addEventListener('change', updateDarkMode);
    }

    // Save theme preference (but not for system default)
    if (theme !== 'system') {
      localStorage.setItem('theme', theme);
    } else {
      localStorage.removeItem('theme');
    }

    // Cleanup
    return () => {
      if (theme === 'system') {
        mediaQuery.removeEventListener('change', updateDarkMode);
      }
    };
  }, [theme]);

  const setThemeMode = (newTheme) => {
    setTheme(newTheme);
  };

  return {
    theme,
    isDark,
    setTheme: setThemeMode,
    // Convenience methods for easier usage
    setLight: () => setThemeMode('light'),
    setDark: () => setThemeMode('dark'),
    setSystem: () => setThemeMode('system'),
  };
};
