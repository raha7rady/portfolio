"use client";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
import { SKILL_CATEGORIES, SKILL_LEVEL_TONE } from "@/data/skills";
import { useLocale } from "@/hooks/useLocale";

export default function QuickSkillsSection() {
  const { dict } = useLocale();

  // فقط دسته Backend & .NET برای پیش‌نمایش سریع در صفحه اصلی نشان داده می‌شود؛
  // فهرست کامل و همه دسته‌ها در صفحه /skills در دسترس است.
  const preview = SKILL_CATEGORIES[0];

  if (!preview) return null;

  return (
    <section className="page-container section-spacing border-t border-border">
      <SectionHeader
        tag={dict.quickSkills.tag}
        title={dict.quickSkills.heading}
        subtitle={dict.quickSkills.description}
        align="left"
      />

      <FadeIn className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {preview.skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3"
          >
            <span className="text-sm font-medium text-foreground">{skill.name}</span>
            <Badge tone={SKILL_LEVEL_TONE[skill.level]} size="sm">
              {dict.skills.levels[skill.level]}
            </Badge>
          </div>
        ))}
      </FadeIn>

      <div className="mt-8 flex justify-center">
        <Button href="/skills" variant="outline" size="md">
          {dict.quickSkills.viewAllSkills}
        </Button>
      </div>
    </section>
  );
}
