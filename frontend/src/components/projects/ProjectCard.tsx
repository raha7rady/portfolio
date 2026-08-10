"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import TechBadgeList from "@/components/projects/TechBadgeList";
import { useLocale } from "@/hooks/useLocale";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const { locale, dict } = useLocale();

  return (
    <Card className="flex flex-col">
      <div
        aria-hidden
        className="flex h-40 items-center justify-center rounded-card bg-gradient-to-br from-accent/10 to-accent2/10 text-sm text-muted"
      >
        Screenshot
      </div>

      <h3 className="mt-4 text-lg font-semibold text-foreground">{project.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">
        {project.shortDescription[locale]}
      </p>

      <div className="mt-4">
        <TechBadgeList techs={project.techStack} />
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Link
          href={`/projects/${project.slug}`}
          className="text-sm font-semibold text-accent hover:underline"
        >
          {dict.projects.viewCaseStudy} ←
        </Link>

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-accent"
          >
            GitHub
          </a>
        )}
      </div>
    </Card>
  );
}
