"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useLocale } from "@/hooks/useLocale";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { dict } = useLocale();

  const label = theme === "dark" ? dict.theme.switchToLight : dict.theme.switchToDark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center rounded-card border border-border text-muted transition-colors hover:border-accent hover:text-accent"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
