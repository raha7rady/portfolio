"use client";

import { SOCIAL_LINKS } from "@/data/social";
import { useLocale } from "@/hooks/useLocale";

export default function Footer() {
  const { dict } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="page-container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <p className="text-sm text-muted">
          © {year} ساناز دربندی. {dict.footer.rights}
        </p>

        <ul className="flex items-center gap-5">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
