"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/ui/FadeIn";
import { SKILL_CATEGORIES, SKILL_LEVEL_TONE, type SkillLevel } from "@/data/skills";
import { useLocale, type Dictionary } from "@/hooks/useLocale";

function levelLabel(level: SkillLevel, dict: Dictionary): string {
  const labels: Record<SkillLevel, string> = {
    production: dict.skills.levelProduction,
    practiced: dict.skills.levelPracticed,
    learning: dict.skills.levelLearning,
  };
  return labels[level];
}

export default function SkillsGrid() {
  const { dict } = useLocale();

  return (
    <div className="space-y-12">
      {SKILL_CATEGORIES.map((category, index) => (
        <FadeIn key={category.title} delay={index * 0.05}>
          <h2 className="text-xl font-semibold text-foreground">{category.title}</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.skills.map((skill) => (
              <Card key={skill.name} className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{skill.name}</span>
                <Badge tone={SKILL_LEVEL_TONE[skill.level]}>
                  {levelLabel(skill.level, dict)}
                </Badge>
              </Card>
            ))}
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
