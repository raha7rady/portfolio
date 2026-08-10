"use client";

import SkillsGrid from "@/components/sections/SkillsGrid";
import { useLocale } from "@/hooks/useLocale";

export default function SkillsContent() {
  const { dict } = useLocale();

  return (
    <div className="page-container section-spacing">
      <h1 className="text-3xl font-bold text-foreground">{dict.skills.title}</h1>
      <p className="mt-2 max-w-2xl text-muted">{dict.skills.description}</p>

      <div className="mt-10">
        <SkillsGrid />
      </div>
    </div>
  );
}
