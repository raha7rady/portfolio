"use client";

import Card from "@/components/ui/Card";
import FadeIn from "@/components/ui/FadeIn";
import { useLocale } from "@/hooks/useLocale";

export default function AboutContent() {
  const { dict } = useLocale();

  return (
    <div className="page-container section-spacing">
      <h1 className="text-3xl font-bold text-foreground">{dict.about.title}</h1>

      <div className="mt-8 grid gap-10 md:grid-cols-[220px_1fr]">
        {/* آواتار موقت — تا وقتی عکس واقعی جایگزین شود (طبق نکات باز فاز ۱) */}
        <div
          aria-hidden
          className="flex h-48 w-48 items-center justify-center rounded-card bg-gradient-to-br from-accent/20 to-accent2/20 text-5xl font-bold text-accent"
        >
          س
        </div>

        <FadeIn>
          <p className="leading-8 text-foreground/90">{dict.about.bioParagraph1}</p>
          <p className="mt-4 leading-8 text-foreground/90">{dict.about.bioParagraph2}</p>

          <Card className="mt-8">
            <h2 className="text-lg font-semibold text-foreground">
              {dict.about.educationTitle}
            </h2>
            <p className="mt-2 text-sm text-muted">{dict.about.educationDegree}</p>
            <p className="text-sm text-muted">{dict.about.educationStatus}</p>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
