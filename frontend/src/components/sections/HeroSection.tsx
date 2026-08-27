"use client";

import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Github,
  Server as ServerIcon,
  FileDown,
  Braces,
  Network,
  Database,
  HardDrive,
  Layers,
} from "lucide-react";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { useLocale } from "@/hooks/useLocale";

const CORE_TECH_TAGS = [
  {
    label: "C#",
    icon: Braces,
    color: "text-violet-500",
    ring: "border-violet-500/25 bg-violet-500/10",
  },
  {
    label: "ASP.NET Core",
    icon: ServerIcon,
    color: "text-accent",
    ring: "border-accent/25 bg-accent/10",
  },
  {
    label: "RESTful API",
    icon: Network,
    color: "text-emerald-500",
    ring: "border-emerald-500/25 bg-emerald-500/10",
  },
  {
    label: "Entity Framework Core",
    icon: Database,
    color: "text-amber-500",
    ring: "border-amber-500/25 bg-amber-500/10",
  },
  {
    label: "SQL Server",
    icon: HardDrive,
    color: "text-sky-500",
    ring: "border-sky-500/25 bg-sky-500/10",
  },
  {
    label: "Clean Architecture",
    icon: Layers,
    color: "text-rose-500",
    ring: "border-rose-500/25 bg-rose-500/10",
  },
];

export default function HeroSection() {
  const { locale, dict } = useLocale();
  const isRtl = locale === "fa";

  return (
    <section className="page-container section-spacing relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-accent/10 via-accent2/10 to-transparent blur-[120px]" />

      <FadeIn className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-xs font-semibold text-accent">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          <span>{dict.hero.badge}</span>
        </div>

        <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
          <span className="mb-2 block text-base font-normal text-muted md:text-xl">
            {dict.hero.greeting}
          </span>

          <span className="bg-gradient-to-r from-foreground via-accent to-accent2 bg-clip-text text-transparent">
            {dict.hero.name}
          </span>
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="font-mono text-lg font-semibold text-accent">
            {dict.hero.tagline}
          </span>

          <span className="hidden text-muted sm:inline">|</span>

          <span className="text-sm font-medium text-muted">
            {locale === "fa" ? "دانشگاه خوارزمی" : "Kharazmi University"}
          </span>
        </div>

        <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/90">
          {dict.hero.description}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button
            href="/projects"
            variant="primary"
            size="lg"
            icon={isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            iconPosition="end"
          >
            {dict.hero.ctaProjects}
          </Button>

          <Button
            href="/contact"
            variant="secondary"
            size="lg"
            icon={<Mail size={18} />}
          >
            {dict.hero.ctaContact}
          </Button>

          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3.5 text-sm font-semibold text-foreground/90 shadow-sm transition-colors hover:text-foreground"
          >
            <FileDown size={18} />
            {dict.hero.ctaResume}
          </a>

          <a
            href="https://github.com/raha7rady"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface p-3.5 text-muted shadow-sm transition-colors hover:text-foreground"
            title="GitHub"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
        </div>

        <div className="mt-10 w-full border-t border-border pt-6">
          <p className="mb-3 flex items-center gap-2 font-mono text-xs font-medium text-muted">
            <ServerIcon size={14} className="text-accent" />
            {dict.hero.techRowLabel}
          </p>

          <div className="flex flex-wrap gap-2">
            {CORE_TECH_TAGS.map(
              ({ label, icon: Icon, color, ring }) => (
                <span
                  key={label}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-sm transition-transform hover:-translate-y-0.5 ${ring}`}
                >
                  <Icon size={14} className={color} />
                  <span className="text-foreground/90">{label}</span>
                </span>
              )
            )}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}