"use client";

import SkillsGrid from "@/components/sections/SkillsGrid";
import SectionHeader from "@/components/ui/SectionHeader";
import { useLocale } from "@/hooks/useLocale";

export default function SkillsContent() {
  const { dict } = useLocale();

  return (
    <div className="page-container section-spacing">
      <SectionHeader
        tag={dict.skills.tag}
        title={dict.skills.title}
        subtitle={dict.skills.description}
        align="left"
      />

      <SkillsGrid />
    </div>
  );
}
