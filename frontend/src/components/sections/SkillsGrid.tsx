"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/ui/FadeIn";
import { SKILL_CATEGORIES, SKILL_LEVEL_TONE } from "@/data/skills";
import { useLocale } from "@/hooks/useLocale";

export default function SkillsGrid() {
  const { dict } = useLocale();
  const [query, setQuery] = useState("");

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SKILL_CATEGORIES;

    return SKILL_CATEGORIES.map((category) => ({
      ...category,
      skills: category.skills.filter((skill) => skill.name.toLowerCase().includes(q)),
    })).filter((category) => category.skills.length > 0);
  }, [query]);

  return (
    <div>
      <div className="relative mb-8 max-w-md">
        <Search
          size={16}
          className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={dict.skills.searchPlaceholder}
          className="w-full rounded-xl border border-border bg-surface py-2.5 ps-10 pe-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div className="mb-10 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-xs text-muted">
        <span className="font-mono font-semibold text-foreground">{dict.skills.legendTitle}</span>
        <Badge tone={SKILL_LEVEL_TONE.handsOn} size="sm">
          {dict.skills.levels.handsOn}
        </Badge>
        <Badge tone={SKILL_LEVEL_TONE.workingKnowledge} size="sm">
          {dict.skills.levels.workingKnowledge}
        </Badge>
        <Badge tone={SKILL_LEVEL_TONE.learning} size="sm">
          {dict.skills.levels.learning}
        </Badge>
      </div>

      <div className="space-y-12">
        {filteredCategories.map((category, index) => (
          <FadeIn key={category.title} delay={index * 0.05}>
            <h2 className="text-xl font-semibold text-foreground">{category.title}</h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.skills.map((skill) => (
                <Card key={skill.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  <Badge tone={SKILL_LEVEL_TONE[skill.level]} size="sm">
                    {dict.skills.levels[skill.level]}
                  </Badge>
                </Card>
              ))}
            </div>
          </FadeIn>
        ))}

        {filteredCategories.length === 0 && (
          <p className="text-sm text-muted">
            {dict.skills.searchPlaceholder}
          </p>
        )}
      </div>
    </div>
  );
}
