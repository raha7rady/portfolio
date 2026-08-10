"use client";

import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/ui/FadeIn";
import { useLocale } from "@/hooks/useLocale";

const TECH_BADGES = [
  "C#",
  "ASP.NET Core",
  "SQL Server",
  "Entity Framework Core",
  "React",
  "Git",
  "Docker",
];

export default function HeroSection() {
  const { dict } = useLocale();

  return (
    <section className="page-container section-spacing">
      <FadeIn>
        <p className="text-sm font-semibold text-accent">{dict.hero.greeting}</p>
        <h1 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
          {dict.hero.name}
        </h1>
        <p className="mt-1 text-xl text-muted">{dict.hero.tagline}</p>

        <p className="mt-6 max-w-2xl leading-8 text-foreground/90">
          {dict.hero.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/projects" variant="primary">
            {dict.hero.ctaProjects}
          </Button>
          <Button
            href="/resume.pdf"
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.hero.ctaResume}
          </Button>
        </div>

        <ul className="mt-8 flex flex-wrap gap-2">
          {TECH_BADGES.map((tech) => (
            <li key={tech}>
              <Badge tone="neutral">{tech}</Badge>
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
