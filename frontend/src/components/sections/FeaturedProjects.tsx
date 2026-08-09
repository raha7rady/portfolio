import Link from "next/link";
import Card from "@/components/ui/Card";
import TechBadgeList from "@/components/projects/TechBadgeList";
import { getFeaturedProjects } from "@/data/projects";

export default function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section className="page-container section-spacing border-t border-border">
      <h2 className="text-2xl font-bold text-foreground">پروژه‌های ویژه</h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {featured.map((project) => (
          <Card key={project.slug}>
            <h3 className="text-lg font-semibold text-foreground">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              {project.shortDescription}
            </p>

            <div className="mt-4">
              <TechBadgeList techs={project.techStack} />
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
            >
              مشاهده جزئیات ←
            </Link>
          </Card>
        ))}

        {/* پروژه بعدی هنوز در data/projects.ts ثبت نشده (در حال ساخت است) */}
        <Card>
          <h3 className="text-lg font-semibold text-foreground">پروژه بعدی</h3>
          <p className="mt-2 text-sm leading-6 text-muted">
            در حال طراحی و توسعه — به‌زودی اضافه می‌شود.
          </p>
          <span className="mt-4 inline-block text-sm text-muted">به‌زودی</span>
        </Card>
      </div>
    </section>
  );
}
