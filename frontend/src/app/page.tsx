import HeroSection from "@/components/sections/HeroSection";
import StatsStrip from "@/components/sections/StatsStrip";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import QuickSkillsSection from "@/components/sections/QuickSkillsSection";
import LatestBlogSection from "@/components/sections/LatestBlogSection";
import CtaSection from "@/components/sections/CtaSection";
import { getAllPostsMeta } from "@/lib/mdx";

export default function HomePage() {
  const latestPosts = getAllPostsMeta().slice(0, 2);

  return (
    <>
      <HeroSection />
      <StatsStrip />
      <FeaturedProjects />
      <QuickSkillsSection />
      <LatestBlogSection posts={latestPosts} />
      <CtaSection />
    </>
  );
}
