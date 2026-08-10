import type { Metadata } from "next";
import SkillsContent from "@/components/sections/SkillsContent";

export const metadata: Metadata = {
  title: "مهارت‌ها | ساناز دربندی",
  description:
    "مهارت‌های فنی ساناز دربندی در Backend، دیتابیس، Frontend و ابزارهای توسعه — با سطح واقعی استفاده از هرکدام.",
};

export default function SkillsPage() {
  return <SkillsContent />;
}
