import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyContent from "@/components/projects/CaseStudyContent";
import { PROJECTS, getProjectBySlug } from "@/data/projects";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return { title: "پروژه یافت نشد | ساناز" };
  }

  // متادیتای SEO از نسخه فارسی توضیح کوتاه استفاده می‌کند — چون این پروژه هنوز
  // مسیر جداگانه per-locale ندارد (تصمیم فاز ۲: مسیر واحد، نه /fa و /en جدا).
  return {
    title: `${project.title} | ساناز دربندی`,
    description: project.shortDescription.fa,
  };
}

export default function ProjectCaseStudyPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyContent project={project} />;
}
