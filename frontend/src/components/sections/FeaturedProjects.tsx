import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Link from "next/link";

type FeaturedProject = {
  title: string;
  description: string;
  techs: string[];
  href?: string; // نبودن href یعنی هنوز صفحه Case Study ساخته نشده (فاز ۴)
};

// نسخه کامل با Screenshot، My Role، Challenges و ... در فاز ۴ در data/projects.ts ساخته می‌شود.
const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    title: "StudentInsights",
    description:
      "سامانه مدیریت و تحلیل فعالیت‌های آموزشی دانشجویی، توسعه‌یافته با Clean Architecture و CQRS.",
    techs: ["ASP.NET Core", "CQRS", "SQL Server", "React"],
    // href در فاز ۴ به /projects/student-insights اضافه می‌شود
  },
  {
    title: "پروژه بعدی",
    description: "در حال طراحی و توسعه — به‌زودی اضافه می‌شود.",
    techs: [],
  },
];

export default function FeaturedProjects() {
  return (
    <section className="page-container section-spacing border-t border-border">
      <h2 className="text-2xl font-bold text-foreground">پروژه‌های ویژه</h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {FEATURED_PROJECTS.map((project) => (
          <Card key={project.title}>
            <h3 className="text-lg font-semibold text-foreground">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              {project.description}
            </p>

            {project.techs.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.techs.map((tech) => (
                  <li key={tech}>
                    <Badge tone="accent">{tech}</Badge>
                  </li>
                ))}
              </ul>
            )}

            {project.href ? (
              <Link
                href={project.href}
                className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
              >
                مشاهده جزئیات ←
              </Link>
            ) : (
              <span className="mt-4 inline-block text-sm text-muted">
                به‌زودی
              </span>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}
