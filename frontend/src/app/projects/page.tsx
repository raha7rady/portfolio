import type { Metadata } from "next";
import ProjectCard from "@/components/projects/ProjectCard";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "پروژه‌ها | مهتا",
};

export default function ProjectsPage() {
  return (
    <div className="page-container section-spacing">
      <h1 className="text-3xl font-bold text-foreground">پروژه‌ها</h1>
      <p className="mt-2 max-w-2xl text-muted">
        پروژه‌هایی که برای حل مسائل واقعی طراحی و توسعه داده‌ام — نه صرفاً
        تمرین، بلکه سیستم‌هایی با معماری، منطق کسب‌وکار و چالش‌های فنی واقعی.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
