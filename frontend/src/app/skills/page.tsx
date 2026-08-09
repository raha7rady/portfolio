import type { Metadata } from "next";
import SkillsGrid from "@/components/sections/SkillsGrid";

export const metadata: Metadata = {
  title: "مهارت‌ها | مهتا",
};

export default function SkillsPage() {
  return (
    <div className="page-container section-spacing">
      <h1 className="text-3xl font-bold text-foreground">مهارت‌ها</h1>
      <p className="mt-2 max-w-2xl text-muted">
        به‌جای ادعای سطح، میزان واقعی استفاده از هر مهارت را نشان می‌دهم —
        اینکه در یک پروژه واقعی به‌کار رفته یا در حال یادگیری‌اش هستم.
      </p>

      <div className="mt-10">
        <SkillsGrid />
      </div>
    </div>
  );
}
