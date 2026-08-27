"use client";

import type { ReactNode } from "react";
import { AlertTriangle, Layers, CheckCircle2, Lightbulb, ShieldCheck } from "lucide-react";
import Card from "@/components/ui/Card";
import { useLocale } from "@/hooks/useLocale";
import type { Project } from "@/data/projects";

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="flex items-center gap-2.5 text-xl font-semibold text-foreground">
        {icon}
        <span>{title}</span>
      </h2>
      <div className="mt-4 leading-8 text-foreground/90">{children}</div>
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

      <Section title={dict.caseStudy.problem} icon={<AlertTriangle size={20} className="text-amber-500" />}>
        <Card>
          <p>{project.problem}</p>
        </Card>
      </Section>

      <Section title={dict.caseStudy.architecture} icon={<Layers size={20} className="text-accent" />}>
        <Card>
          <p>{project.architecture}</p>
        </Card>

        {project.architectureLayers && (
          <div className="mt-6">
            <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-wider text-muted">
              {dict.caseStudy.architectureLayersTitle}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.architectureLayers.map((layer, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-5"
                >
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-base font-bold text-accent">{layer.layer}</h4>
                      <span className="font-mono text-[11px] text-muted">Layer {idx + 1}</span>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-muted">{layer.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 border-t border-border pt-3">
                    {layer.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-foreground/90"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Section>

      <Section title={dict.caseStudy.myRole} icon={<CheckCircle2 size={20} className="text-success" />}>
        <Card>
          <ul className="space-y-3">
            {project.myRole.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      <Section title={dict.caseStudy.keyDecisions} icon={<Lightbulb size={20} className="text-amber-500" />}>
        <div className="space-y-4">
          {project.keyDecisions.map((item, idx) => (
            <div
              key={item}
              className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5"
            >
              <div className="shrink-0 rounded-xl bg-amber-500/10 px-2.5 py-1 font-mono text-xs font-bold text-amber-600">
                #{idx + 1}
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={dict.caseStudy.challenges} icon={<ShieldCheck size={20} className="text-accent" />}>
        <div className="space-y-6">
          {project.challenges.map((item) => (
            <Card key={item.challenge}>
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-danger">
                {dict.caseStudy.challengeLabel}
              </p>
              <p className="mt-1 text-sm text-foreground/90">{item.challenge}</p>
              <p className="mt-4 font-mono text-xs font-bold uppercase tracking-wider text-success">
                {dict.caseStudy.solutionLabel}
              </p>
              <p className="mt-1 text-sm text-foreground/90">{item.solution}</p>
            </Card>
          ))}
        </div>
      </Section>

      <div className="mt-12 border-t border-border pt-8">
        <h3 className="mb-4 text-lg font-bold text-foreground">{dict.caseStudy.techStackTitle}</h3>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-xl border border-border bg-surface px-3.5 py-1.5 text-sm font-medium text-foreground/90 shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
