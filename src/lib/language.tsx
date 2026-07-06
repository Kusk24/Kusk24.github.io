"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";
import type { Dict, Lang } from "@/content/types";
import { dictionaries } from "@/content/locales";

// Module-level store backed by localStorage; server snapshot is "en".
const listeners = new Set<() => void>();
let cached: Lang | null = null;

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function getSnapshot(): Lang {
  if (cached === null) {
    try {
      const saved = localStorage.getItem("lang");
      cached = saved === "th" || saved === "my" ? saved : "en";
    } catch {
      cached = "en";
    }
  }
  return cached;
}

function storeLang(l: Lang) {
  cached = l;
  try {
    localStorage.setItem("lang", l);
  } catch {}
  listeners.forEach((fn) => fn());
}

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}>({ lang: "en", setLang: () => {}, t: dictionaries.en });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, () => "en" as Lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => storeLang(l), []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
