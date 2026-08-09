import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { SKILL_CATEGORIES, SKILL_LEVEL_META } from "@/data/skills";

export default function SkillsGrid() {
  return (
    <div className="space-y-12">
      {SKILL_CATEGORIES.map((category) => (
        <div key={category.title}>
          <h2 className="text-xl font-semibold text-foreground">
            {category.title}
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.skills.map((skill) => {
              const meta = SKILL_LEVEL_META[skill.level];

              return (
                <Card key={skill.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {skill.name}
                  </span>
                  <Badge tone={meta.tone}>{meta.label}</Badge>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
