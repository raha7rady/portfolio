"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import TechBadgeList from "@/components/projects/TechBadgeList";
import { getFeaturedProjects } from "@/data/projects";
import { useLocale } from "@/hooks/useLocale";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";

export default function FeaturedProjects() {
  const { locale, dict } = useLocale();
  const isRtl = locale === "fa";
  const featured = getFeaturedProjects();

  return (
    <section className="page-container section-spacing border-t border-border">
      <SectionHeader
        tag={dict.featuredProjects.tag}
        title={dict.featuredProjects.heading}
        subtitle={dict.featuredProjects.description}
        align="left"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {featured.map((project, index) => (
          <FadeIn key={project.slug} delay={index * 0.05}>
            <Card variant="interactive" className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
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

                <p className="text-sm leading-6 text-muted">
                  {project.shortDescription[locale]}
                </p>

                {project.metrics && (
                  <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-border bg-background p-3">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase text-muted">
                          {m.label[locale]}
                        </span>
                        <span className="mt-0.5 text-xs font-bold text-accent">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4">
                  <TechBadgeList techs={project.techStack} />
                </div>
              </div>

              <Button
                href={`/projects/${project.slug}`}
                variant="primary"
                size="sm"
                className="mt-6 self-start"
                icon={isRtl ? <ArrowLeft size={14} /> : <ArrowRight size={14} />}
                iconPosition="end"
              >
                {dict.featuredProjects.viewCaseStudy}
              </Button>
            </Card>
          </FadeIn>
        ))}

        <FadeIn delay={0.1}>
          <Card variant="glow" className="flex h-full flex-col justify-between">
            <div>
              <Badge tone="accent" dot size="sm" className="mb-3">
                {dict.featuredProjects.comingSoonBadge}
              </Badge>
              <h3 className="text-lg font-semibold text-foreground">
                {dict.featuredProjects.comingSoonTitle}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {dict.featuredProjects.comingSoonDesc}
              </p>
            </div>
          </Card>
        </FadeIn>
      </div>

      <div className="mt-8 flex justify-center">
        <Button href="/projects" variant="outline" size="md">
          {dict.featuredProjects.allProjectsBtn}
        </Button>
      </div>
    </section>
  );
}
