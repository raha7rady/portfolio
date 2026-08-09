import Card from "@/components/ui/Card";
import type { Project } from "@/data/projects";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="mt-3 leading-8 text-foreground/90">{children}</div>
    </section>
  );
}

export default function CaseStudySection({ project }: { project: Project }) {
  return (
    <div>
      <Section title="مسئله (Problem)">
        <p>{project.problem}</p>
      </Section>

      <Section title="معماری (Architecture)">
        <p>{project.architecture}</p>
        {/* دیاگرام معماری واقعی (طبق فاز ۱) بعداً به‌صورت تصویر اینجا اضافه می‌شود */}
      </Section>

      <Section title="نقش من (My Role)">
        <ul className="list-inside list-disc space-y-2">
          {project.myRole.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="تصمیمات فنی کلیدی (Key Technical Decisions)">
        <ul className="list-inside list-disc space-y-2">
          {project.keyDecisions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="چالش‌ها و راه‌حل‌ها (Challenges & Solutions)">
        <div className="space-y-6">
          {project.challenges.map((item) => (
            <Card key={item.challenge}>
              <p className="text-sm font-semibold text-danger">چالش</p>
              <p className="mt-1 text-sm text-foreground/90">{item.challenge}</p>
              <p className="mt-4 text-sm font-semibold text-success">راه‌حل</p>
              <p className="mt-1 text-sm text-foreground/90">{item.solution}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
