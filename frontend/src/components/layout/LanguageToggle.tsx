"use client";

import { Languages } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export default function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, dict, setLocale } = useLocale();

  function handleClick() {
    setLocale(locale === "fa" ? "en" : "fa");
  }

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="flex h-9 min-w-[38px] items-center justify-center rounded-xl border border-border bg-surface px-2.5 text-xs font-semibold text-foreground"
        title={locale === "fa" ? "Switch to English" : "تغییر به فارسی"}
      >
        {locale === "fa" ? "EN" : "فا"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex h-9 items-center gap-1.5 rounded-xl border border-border bg-surface px-3 text-xs font-medium text-muted transition-colors hover:border-accent/50 hover:text-accent"
    >
      <Languages size={14} className="text-accent" />
      {dict.language.switchTo}
    </button>
  );
}
