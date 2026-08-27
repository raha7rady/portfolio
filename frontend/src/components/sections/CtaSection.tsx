"use client";

import { ArrowLeft, ArrowRight, Mail, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import { useLocale } from "@/hooks/useLocale";
import { SOCIAL_LINKS } from "@/data/social";

export default function CtaSection() {
  const { locale, dict } = useLocale();
  const isRtl = locale === "fa";
  const email = SOCIAL_LINKS.find((l) => l.label === "Email")?.href.replace("mailto:", "") ?? "";

  return (
    <section className="page-container section-spacing">
      <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-r from-surface via-accent/5 to-surface p-8 text-center shadow-md sm:p-12">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[90px]" />

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
          <div className="mb-4 inline-flex rounded-2xl border border-accent/30 bg-accent/10 p-3 text-accent shadow-[0_0_20px_rgb(var(--color-accent)/0.2)]">
            <Sparkles size={24} />
          </div>

          <h2 className="text-2xl font-extrabold leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {dict.ctaSection.title}
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            {dict.ctaSection.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              icon={isRtl ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              iconPosition="end"
            >
              {dict.ctaSection.ctaButton}
            </Button>

            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 font-mono text-sm text-muted shadow-sm transition-colors hover:text-foreground"
            >
              <Mail size={16} className="text-accent" />
              <span>{email}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
