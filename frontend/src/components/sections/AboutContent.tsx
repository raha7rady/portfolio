"use client";

import Card from "@/components/ui/Card";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";

export default function AboutContent() {
  const { dict } = useLocale();

  return (
    <div className="page-container section-spacing">
      <SectionHeader
        tag={dict.about.tag}
        title={dict.about.title}
        subtitle={dict.about.subtitle}
        align="left"
      />

      <div className="grid gap-10 md:grid-cols-[220px_1fr]">
        {/* آواتار موقت — تا وقتی عکس واقعی جایگزین شود (طبق نکات باز فاز ۱) */}
        <div
          aria-hidden
          className="flex h-48 w-48 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent2/20 text-5xl font-bold text-accent"
        >
          س
        </div>

        <FadeIn>
          <p className="leading-8 text-foreground/90">{dict.about.bio1}</p>
          <p className="mt-4 leading-8 text-foreground/90">{dict.about.bio2}</p>
          <p className="mt-4 leading-8 text-foreground/90">{dict.about.bio3}</p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {dict.about.quickStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-surface px-3 py-3 text-start"
              >
                <p className="font-mono text-[11px] uppercase text-muted">{stat.label}</p>
                <p className="mt-0.5 text-sm font-bold text-foreground">{stat.val}</p>
              </div>
            ))}
          </div>

          <Card className="mt-8">
            <h2 className="text-lg font-semibold text-foreground">{dict.about.educationTitle}</h2>
            <p className="mt-2 text-sm font-medium text-foreground/90">
              {dict.about.educationDegree}
            </p>
            <p className="text-sm text-muted">{dict.about.educationUniversity}</p>
            <p className="mt-1 text-sm text-muted">{dict.about.educationStatus}</p>
          </Card>
        </FadeIn>
      </div>

      <div className="mt-14">
        <h2 className="text-xl font-semibold text-foreground">{dict.about.principlesTitle}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {dict.about.principles.map((principle, index) => (
            <FadeIn key={principle.title} delay={index * 0.05}>
              <Card className="h-full">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-mono text-xs font-bold text-accent">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{principle.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted">{principle.desc}</p>
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}
