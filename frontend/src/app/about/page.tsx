import type { Metadata } from "next";
import AboutContent from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "درباره من | ساناز",
};

export default function AboutPage() {
  return <AboutContent />;
}
