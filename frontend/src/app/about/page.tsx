import type { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "درباره من | ساناز دربندی",
  description:
    "درباره ساناز دربندی — دانشجوی مهندسی کامپیوتر دانشگاه خوارزمی و توسعه‌دهنده Backend با تمرکز بر C# و ASP.NET Core.",
};

export default function AboutPage() {
  return <AboutContent />;
}
