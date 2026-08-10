"use client";

import ProjectCard from "@/components/projects/ProjectCard";
import FadeIn from "@/components/ui/FadeIn";
import { PROJECTS } from "@/data/projects";
import { useLocale } from "@/hooks/useLocale";

export default function ProjectsContent() {
  const { dict } = useLocale();

  return (
    <div className="page-container section-spacing">
      <h1 className="text-3xl font-bold text-foreground">{dict.projects.title}</h1>
      <p className="mt-2 max-w-2xl text-muted">{dict.projects.description}</p>

      <FadeIn className="mt-10 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </FadeIn>
    </div>
  );
}
