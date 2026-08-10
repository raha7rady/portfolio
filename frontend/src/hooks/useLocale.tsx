"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import fa from "@/i18n/fa.json";
import en from "@/i18n/en.json";

export type Locale = "fa" | "en";
export type Dictionary = typeof fa;

const DICTIONARIES: Record<Locale, Dictionary> = { fa, en };
const STORAGE_KEY = "locale";

type LocaleContextValue = {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function applyLocaleToDocument(locale: Locale) {
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
}

/**
 * حالت اولیه همیشه "fa" است تا با HTML رندرشده سمت سرور (که پیش‌فرض فارسی/RTL دارد) یکی باشد
 * و خطای Hydration رخ ندهد؛ مقدار واقعی ذخیره‌شده در localStorage در useEffect (بعد از mount) خوانده می‌شود.
 * برای جلوگیری از "پرش جهت صفحه" در بار اول، AppInitScript همین مقدار را زودتر (قبل از Hydration) روی <html> اعمال می‌کند.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fa");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial: Locale = stored === "en" ? "en" : "fa";
    setLocaleState(initial);
    applyLocaleToDocument(initial);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    applyLocaleToDocument(next);
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, dict: DICTIONARIES[locale], setLocale }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale باید داخل LocaleProvider استفاده شود.");
  }
  return ctx;
}
