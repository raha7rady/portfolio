"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import FadeIn from "@/components/ui/FadeIn";
import TechBadgeList from "@/components/projects/TechBadgeList";
import { getFeaturedProjects } from "@/data/projects";
import { useLocale } from "@/hooks/useLocale";

export default function FeaturedProjects() {
  const { locale, dict } = useLocale();
  const featured = getFeaturedProjects();

  return (
    <section className="page-container section-spacing border-t border-border">
      <FadeIn>
        <h2 className="text-2xl font-bold text-foreground">
          {dict.featuredProjects.heading}
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <Card key={project.slug}>
              <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                {project.shortDescription[locale]}
              </p>

              <div className="mt-4">
                <TechBadgeList techs={project.techStack} />
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
              >
                {dict.featuredProjects.viewDetails} ←
              </Link>
            </Card>
          ))}

          <Card>
            <h3 className="text-lg font-semibold text-foreground">
              {dict.featuredProjects.comingSoonTitle}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              {dict.featuredProjects.comingSoonDescription}
            </p>
            <span className="mt-4 inline-block text-sm text-muted">
              {dict.featuredProjects.comingSoon}
            </span>
          </Card>
        </div>
      </FadeIn>
    </section>
  );
}
