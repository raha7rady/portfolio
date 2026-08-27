"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Github,
  Copy,
  Check,
  ArrowUp,
  Terminal,
} from "lucide-react";

import { SOCIAL_LINKS } from "@/data/social";

import { useLocale } from "@/hooks/useLocale";

import Badge from "@/components/ui/Badge";

export default function Footer() {
  const { locale, dict } = useLocale();

  const [copied, setCopied] = useState(false);

  const year = new Date().getFullYear();

  const githubLink = SOCIAL_LINKS.find(
    (l) => l.label === "GitHub"
  );

  const linkedinLink = SOCIAL_LINKS.find(
    (l) => l.label === "LinkedIn"
  );

  const emailLink = SOCIAL_LINKS.find(
    (l) => l.label === "Email"
  );

  const email =
    emailLink?.href.replace("mailto:", "") ??
    "sanaz7rn@gmail.com";

  function handleCopyEmail() {
    navigator.clipboard.writeText(email);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <footer className="relative mt-24 border-t border-border bg-surface/60">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="page-container py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="flex flex-col items-start gap-4 md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-accent to-accent2 p-0.5 shadow-md">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-background">
                  <span className="text-sm font-bold text-accent">
                    SD
                  </span>
                </div>
              </div>

              <span className="text-lg font-bold text-foreground">
                {locale === "fa"
                  ? "ساناز دربندی"
                  : "Sanaz Darbandi"}
              </span>
            </div>

            <p className="max-w-sm text-start text-sm leading-relaxed text-muted">
              {locale === "fa"
                ? "توسعه‌دهنده جونیور .NET با تمرکز بر C#، ASP.NET Core، توسعه Backend و طراحی معماری‌های مقیاس‌پذیر."
                : "Junior .NET developer focused on C#, ASP.NET Core, backend development, and designing scalable architectures."}
            </p>

            <Badge tone="success" dot size="sm">
              {dict.footer.availableBadge}
            </Badge>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start gap-3 md:col-span-3">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
              {locale === "fa"
                ? "دسترسی سریع"
                : "Quick Links"}
            </h4>

            <ul className="space-y-2 text-start text-sm">
              <li>
                <Link
                  href="/projects"
                  className="text-muted transition-colors hover:text-accent"
                >
                  {dict.nav.projects}
                </Link>
              </li>

              <li>
                <Link
                  href="/skills"
                  className="text-muted transition-colors hover:text-accent"
                >
                  {dict.nav.skills}
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-muted transition-colors hover:text-accent"
                >
                  {dict.nav.about}
                </Link>
              </li>

              <li>
                <Link
                  href="/blog"
                  className="text-muted transition-colors hover:text-accent"
                >
                  {dict.nav.blog}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col items-start gap-3 md:col-span-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
              {locale === "fa"
                ? "ارتباط مستقیم"
                : "Connect"}
            </h4>

            {/* Email */}
            <div className="flex w-full items-center justify-between rounded-xl border border-border bg-background px-2.5 py-2 font-mono text-xs shadow-sm">
              <span className="min-w-0 truncate text-muted">
                {email}
              </span>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="ms-2 shrink-0 rounded-lg bg-surface p-1.5 text-accent transition-colors hover:bg-border/40"
                title="Copy email"
                aria-label="Copy email"
              >
                {copied ? (
                  <Check size={14} className="text-success" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>

            {/* Social Links */}
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {githubLink && (
                <a
                  href={githubLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-muted transition-colors hover:text-foreground"
                  aria-label="GitHub"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
              )}

              {linkedinLink && (
                <a
                  href={linkedinLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-muted transition-colors hover:text-foreground"
                  aria-label="LinkedIn"
                >
                  <span>LinkedIn</span>
                </a>
              )}

              <Link
                href="/contact"
                className="flex items-center gap-1.5 rounded-xl border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs text-accent transition-colors hover:bg-accent/20"
              >
                <span>{dict.nav.contact}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {year}{" "}
            {locale === "fa"
              ? "ساناز دربندی"
              : "Sanaz Darbandi"}
            . {dict.footer.rights}
          </p>

          <p className="flex items-center gap-1.5">
            <Terminal size={13} className="text-accent" />
            <span>{dict.footer.builtWith}</span>
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-muted transition-colors hover:text-foreground"
          >
            <span>
              {locale === "fa"
                ? "بازگشت به بالا"
                : "Back to top"}
            </span>

            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}

