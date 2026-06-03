import { useCallback, useEffect, useState } from "react";
import {
  applyTheme,
  getStoredTheme,
  setTheme as persistTheme,
  toggleTheme as flipTheme,
} from "../theme";

export function useTheme() {
  const [theme, setThemeState] = useState(() => getStoredTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "theme" && (e.newValue === "dark" || e.newValue === "light")) {
        setThemeState(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setTheme = useCallback((next) => {
    const value = persistTheme(next);
    setThemeState(value);
    return value;
  }, []);

  const toggleTheme = useCallback(() => {
    const value = flipTheme();
    setThemeState(value);
    return value;
  }, []);

  return {
    theme,
    isDarkMode: theme === "dark",
    setTheme,
    toggleTheme,
  };
}
