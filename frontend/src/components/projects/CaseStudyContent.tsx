"use client";

import Link from "next/link";
import TechBadgeList from "@/components/projects/TechBadgeList";
import CaseStudySection from "@/components/projects/CaseStudySection";
import { useLocale } from "@/hooks/useLocale";
import type { Project } from "@/data/projects";

export default function CaseStudyContent({ project }: { project: Project }) {
  const { locale, dict } = useLocale();

  return (
    <div className="page-container section-spacing max-w-3xl">
      <Link href="/projects" className="text-sm text-muted hover:text-accent">
        ← {dict.caseStudy.back}
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-foreground">{project.title}</h1>
      <p className="mt-2 text-muted">{project.shortDescription[locale]}</p>

      <div className="mt-4">
        <TechBadgeList techs={project.techStack} />
      </div>

      <div className="mt-4 flex gap-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-accent hover:underline"
          >
            {dict.caseStudy.viewGithub} ←
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-accent hover:underline"
          >
            {dict.caseStudy.viewLive} ←
          </a>
        )}
      </div>

      <div
        aria-hidden
        className="mt-10 flex h-64 items-center justify-center rounded-card bg-gradient-to-br from-accent/10 to-accent2/10 text-sm text-muted"
      >
        Screenshot
      </div>

      <CaseStudySection project={project} />
    </div>
  );
}
