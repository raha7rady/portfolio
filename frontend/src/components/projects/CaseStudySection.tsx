"use client";

import Card from "@/components/ui/Card";
import { useLocale } from "@/hooks/useLocale";
import type { Project } from "@/data/projects";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="mt-3 leading-8 text-foreground/90">{children}</div>
    </section>
  );
}

export default function CaseStudySection({ project }: { project: Project }) {
  const { locale, dict } = useLocale();

  return (
    <div>
      {/* بدنه کامل Case Study (Problem/Architecture/...) طبق تصمیم فاز ۶ فعلاً فقط فارسی نوشته شده؛
          عنوان هر بخش ترجمه شده، ولی خودِ متن هنوز فارسی است — این باکس آن را برای خواننده انگلیسی‌زبان شفاف می‌کند. */}
      {locale === "en" && (
        <Card className="mt-10 border-accent/40 bg-accent/5">
          <p className="text-sm text-accent">{dict.caseStudy.notTranslatedNotice}</p>
        </Card>
      )}

      <Section title={dict.caseStudy.problem}>
        <p>{project.problem}</p>
      </Section>

      <Section title={dict.caseStudy.architecture}>
        <p>{project.architecture}</p>
      </Section>

      <Section title={dict.caseStudy.myRole}>
        <ul className="list-inside list-disc space-y-2">
          {project.myRole.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title={dict.caseStudy.keyDecisions}>
        <ul className="list-inside list-disc space-y-2">
          {project.keyDecisions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title={dict.caseStudy.challenges}>
        <div className="space-y-6">
          {project.challenges.map((item) => (
            <Card key={item.challenge}>
              <p className="text-sm font-semibold text-danger">
                {dict.caseStudy.challengeLabel}
              </p>
              <p className="mt-1 text-sm text-foreground/90">{item.challenge}</p>
              <p className="mt-4 text-sm font-semibold text-success">
                {dict.caseStudy.solutionLabel}
              </p>
              <p className="mt-1 text-sm text-foreground/90">{item.solution}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
