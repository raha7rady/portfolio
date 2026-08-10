"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const STORAGE_KEY = "theme";

function applyThemeToDocument(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

/**
 * حالت اولیه "dark" فرض می‌شود (چون AppInitScript هم همین پیش‌فرض را دارد) تا با HTML سمت سرور
 * هماهنگ باشد؛ مقدار واقعی در useEffect از localStorage/سیستم خوانده و اصلاح می‌شود.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const initial: Theme = stored ?? (prefersLight ? "light" : "dark");
    setThemeState(initial);
    applyThemeToDocument(initial);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      window.localStorage.setItem(STORAGE_KEY, next);
      applyThemeToDocument(next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
