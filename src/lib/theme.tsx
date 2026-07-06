"use client";
import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";

type Theme = "dark" | "light";

// Module-level store: the pre-paint script in layout.tsx puts the saved theme
// on <html data-theme> before hydration; this store reads and mutates it.
const listeners = new Set<() => void>();
let cached: Theme | null = null;

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function getSnapshot(): Theme {
  if (cached === null) {
    cached =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark";
  }
  return cached;
}

function setTheme(next: Theme) {
  cached = next;
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {}
  listeners.forEach((fn) => fn());
}

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "dark" as Theme);
  const toggleTheme = useCallback(() => {
    setTheme(getSnapshot() === "dark" ? "light" : "dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
