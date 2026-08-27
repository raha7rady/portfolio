"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import Card from "@/components/ui/Card";
import TechBadgeList from "@/components/projects/TechBadgeList";
import { useLocale } from "@/hooks/useLocale";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const { locale, dict } = useLocale();
  const isRtl = locale === "fa";

  return (
    <Card variant="interactive" className="flex flex-col">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-accent">
            {project.category === "backend"
              ? locale === "fa"
                ? "سیستم Backend"
                : "Enterprise .NET System"
              : locale === "fa"
                ? "معماری فول‌استک"
                : "Full-Stack Architecture"}
          </span>
          <h3 className="mt-1 text-lg font-semibold text-foreground">{project.title}</h3>
        </div>
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg border border-border bg-background p-2 text-muted transition-colors hover:text-foreground"
            title="GitHub"
          >
            <Github size={16} />
          </a>
        )}
      </div>

      <p className="text-sm leading-6 text-muted">{project.shortDescription[locale]}</p>

      {project.metrics && (
        <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-border bg-background p-3">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-mono text-[10px] uppercase text-muted">{m.label[locale]}</span>
              <span className="mt-0.5 text-xs font-bold text-foreground">{m.value}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <TechBadgeList techs={project.techStack} />
      </div>

      <div className="mt-6 flex items-center gap-4 border-t border-border pt-4">
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
        >
          {dict.projects.viewCaseStudy}
          {isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
        </Link>

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-accent"
          >
            {dict.projects.viewGithub}
          </a>
        )}
      </div>
    </Card>
  );
}
