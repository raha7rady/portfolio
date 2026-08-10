"use client";

import { Languages } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export default function LanguageToggle() {
  const { locale, dict, setLocale } = useLocale();

  function handleClick() {
    setLocale(locale === "fa" ? "en" : "fa");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex h-9 items-center gap-1.5 rounded-card border border-border px-3 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
    >
      <Languages size={16} />
      {dict.language.switchTo}
    </button>
  );
}
