"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "خانه" },
  { href: "/about", label: "درباره من" },
  { href: "/skills", label: "مهارت‌ها" },
  { href: "/projects", label: "پروژه‌ها" },
  { href: "/contact", label: "تماس" },
] as const;

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="page-container flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold text-foreground">
          ساناز<span className="text-accent">.</span>
        </Link>

        <ul className="flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm transition-colors hover:text-accent ${
                    isActive ? "text-accent" : "text-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
