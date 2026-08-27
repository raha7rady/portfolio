"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Github, ChevronRight } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import ThemeToggle from "@/components/layout/ThemeToggle";
import LanguageToggle from "@/components/layout/LanguageToggle";

export default function Navbar() {
  const pathname = usePathname();
  const { locale, dict } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isRtl = locale === "fa";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: dict.nav.home },
    { href: "/about", label: dict.nav.about },
    { href: "/skills", label: dict.nav.skills },
    { href: "/projects", label: dict.nav.projects },
    { href: "/blog", label: dict.nav.blog },
    { href: "/contact", label: dict.nav.contact },
  ] as const;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/90 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="page-container flex h-16 items-center justify-between gap-2">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-accent to-accent2 p-0.5 shadow-md transition-shadow group-hover:shadow-[0_0_20px_rgb(var(--color-accent)/0.5)]">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-background">
              <span className="text-sm font-extrabold tracking-tighter text-accent">SD</span>
            </div>
          </div>
          <div className="flex flex-col text-start">
            <span className="text-sm font-extrabold text-foreground">
              {locale === "fa" ? "ساناز دربندی" : "Sanaz Darbandi"}
            </span>
            <span className="font-mono text-[11px] text-muted">
              {locale === "fa" ? "توسعه‌دهنده Backend" : "Backend Developer"}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 rounded-2xl border border-border bg-surface/70 p-1.5 backdrop-blur-md md:flex">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "border border-accent/30 bg-accent/10 text-accent shadow-sm"
                    : "border border-transparent text-muted hover:bg-border/40 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href="/resume.pdf"
            download
            className="rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:text-foreground"
          >
            {dict.nav.resume}
          </a>
          <a
            href="https://github.com/raha7rady"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-border bg-surface p-2 text-muted transition-colors hover:text-foreground"
            title="GitHub"
          >
            <Github size={16} />
          </a>
          <Link
            href="/contact"
            className="rounded-xl bg-accent px-4 py-1.5 text-xs font-semibold text-background shadow-[0_0_15px_rgb(var(--color-accent)/0.3)] transition-transform active:scale-95"
          >
            {dict.nav.contact}
          </Link>
        </div>

        <div className="flex items-center gap-1.5 lg:hidden">
          <LanguageToggle compact />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-foreground"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-b border-border bg-background px-4 pb-6 pt-2 shadow-2xl lg:hidden">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                    isActive
                      ? "border border-accent/30 bg-accent/10 text-accent"
                      : "text-muted hover:bg-surface hover:text-foreground"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} className={isRtl ? "rotate-180 opacity-60" : "opacity-60"} />
                </Link>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
            <a
              href="https://github.com/raha7rady"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-surface py-3 text-xs font-semibold text-foreground"
            >
              <Github size={16} />
              GitHub
            </a>
            <Link
              href="/contact"
              className="flex-1 rounded-xl bg-accent py-3 text-center text-xs font-bold text-background shadow-lg"
            >
              {dict.nav.contact}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
