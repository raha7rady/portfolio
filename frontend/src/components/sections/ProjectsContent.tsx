"use client";

import { useState } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import { PROJECTS, type ProjectCategory } from "@/data/projects";
import { useLocale } from "@/hooks/useLocale";

type Filter = "all" | ProjectCategory;

export default function ProjectsContent() {
  const { dict } = useLocale();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = PROJECTS.filter((project) => filter === "all" || project.category === filter);

  const tabs: { key: Filter; label: string }[] = [
    { key: "all", label: dict.projects.filterAll },
    { key: "backend", label: dict.projects.filterBackend },
    { key: "fullstack", label: dict.projects.filterFullstack },
  ];

  return (
    <div className="page-container section-spacing">
      <SectionHeader
        tag={dict.projects.tag}
        title={dict.projects.title}
        subtitle={dict.projects.description}
        align="left"
      />

      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
              filter === tab.key
                ? "border border-accent/40 bg-accent/10 text-accent shadow-sm"
                : "border border-border bg-surface text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <FadeIn className="grid gap-6 md:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </FadeIn>
    </div>
  );
}
