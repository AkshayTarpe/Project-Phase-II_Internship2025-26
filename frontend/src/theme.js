const THEME_STORAGE_KEY = "theme";

export function getStoredTheme() {
  const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (saved === "dark" || saved === "light") return saved;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("theme-dark", isDark);
  document.documentElement.setAttribute("data-theme", theme);
}

export function initTheme() {
  applyTheme(getStoredTheme());
}

export function setTheme(theme) {
  const next = theme === "dark" ? "dark" : "light";
  window.localStorage.setItem(THEME_STORAGE_KEY, next);
  applyTheme(next);
  return next;
}

export function toggleTheme() {
  const next = getStoredTheme() === "dark" ? "light" : "dark";
  return setTheme(next);
}
