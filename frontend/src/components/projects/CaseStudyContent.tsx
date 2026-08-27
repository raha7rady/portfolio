"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Github, ExternalLink } from "lucide-react";
import TechBadgeList from "@/components/projects/TechBadgeList";
import CaseStudySection from "@/components/projects/CaseStudySection";
import ImageCarousel from "@/components/projects/ImageCarousel";
import { useLocale } from "@/hooks/useLocale";
import type { Project } from "@/data/projects";

export default function CaseStudyContent({ project }: { project: Project }) {
  const { locale, dict } = useLocale();
  const isRtl = locale === "fa";

  return (
    <div className="page-container section-spacing max-w-3xl">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        {isRtl ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
        {dict.caseStudy.back}
      </Link>

      <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        {project.title}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
        {project.shortDescription[locale]}
      </p>

      <div className="mt-5">
        <TechBadgeList techs={project.techStack} />
      </div>

      {project.metrics && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="rounded-xl border border-border bg-surface px-3 py-3">
              <p className="font-mono text-[10px] uppercase text-muted">{m.label[locale]}</p>
              <p className="mt-0.5 text-sm font-bold text-accent">{m.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-accent/40"
          >
            <Github size={16} />
            {dict.caseStudy.viewGithub}
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-background shadow-[0_0_15px_rgb(var(--color-accent)/0.3)]"
          >
            <ExternalLink size={16} />
            {dict.caseStudy.viewLive}
          </a>
        )}
      </div>

      <ImageCarousel images={project.images} title={project.title} />

      <CaseStudySection project={project} />
    </div>
  );
}
