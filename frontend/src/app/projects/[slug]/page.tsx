import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TechBadgeList from "@/components/projects/TechBadgeList";
import CaseStudySection from "@/components/projects/CaseStudySection";
import { PROJECTS, getProjectBySlug } from "@/data/projects";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return { title: "پروژه یافت نشد | مهتا" };
  }

  return {
    title: `${project.title} | مهتا`,
    description: project.shortDescription,
  };
}

export default function ProjectCaseStudyPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="page-container section-spacing max-w-3xl">
      <Link href="/projects" className="text-sm text-muted hover:text-accent">
        ← بازگشت به پروژه‌ها
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-foreground">
        {project.title}
      </h1>
      <p className="mt-2 text-muted">{project.shortDescription}</p>

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
            مشاهده در GitHub ←
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-accent hover:underline"
          >
            نسخه Live ←
          </a>
        )}
      </div>

      {/* اسکرین‌شات اصلی پروژه — تا اضافه‌شدن عکس واقعی، بلوک نگه‌دارنده */}
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
