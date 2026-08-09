import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

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
  return (
    <section className="page-container section-spacing">
      <p className="text-sm font-semibold text-accent">سلام، من</p>
      <h1 className="mt-2 text-4xl font-bold text-foreground md:text-5xl">
        مهتا
      </h1>
      <p className="mt-1 text-xl text-muted">Junior .NET Backend Developer</p>

      <p className="mt-6 max-w-2xl leading-8 text-foreground/90">
        توسعه‌دهنده Backend با تمرکز بر C# و ASP.NET Core. علاقه‌مند به طراحی
        معماری تمیز و حل مسائل واقعی نرم‌افزار — از پایگاه‌داده تا معماری
        سیستم.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Button href="/projects" variant="primary">
          مشاهده پروژه‌ها
        </Button>
        <Button href="/resume.pdf" variant="secondary" target="_blank" rel="noopener noreferrer">
          دانلود رزومه
        </Button>
      </div>

      <ul className="mt-8 flex flex-wrap gap-2">
        {TECH_BADGES.map((tech) => (
          <li key={tech}>
            <Badge tone="neutral">{tech}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
}
