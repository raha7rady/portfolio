import type { Metadata } from "next";
import ProjectsContent from "@/components/sections/ProjectsContent";

export const metadata: Metadata = {
  title: "پروژه‌ها | ساناز دربندی",
  description:
    "پروژه‌های واقعی ساناز دربندی با معماری، منطق کسب‌وکار و چالش‌های فنی مشخص — از جمله StudentInsights.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
