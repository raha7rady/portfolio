import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyContent from "@/components/projects/CaseStudyContent";
import { PROJECTS, getProjectBySlug } from "@/data/projects";

// نکته فنی مهم (Next.js 15): params دیگر یک شیء ساده نیست، بلکه Promise است
// و باید await شود — این تغییر نسبت به Next.js 14 در فاز ۹ با اجرای واقعی
// `next build` کشف و اصلاح شد.
type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "پروژه یافت نشد | ساناز دربندی" };
  }

  // متادیتای SEO از نسخه فارسی توضیح کوتاه استفاده می‌کند — چون این پروژه هنوز
  // مسیر جداگانه per-locale ندارد (تصمیم فاز ۲: مسیر واحد، نه /fa و /en جدا).
  return {
    title: `${project.title} | ساناز دربندی`,
    description: project.shortDescription.fa,
    openGraph: {
      title: `${project.title} | ساناز دربندی`,
      description: project.shortDescription.fa,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ساناز دربندی`,
      description: project.shortDescription.fa,
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyContent project={project} />;
}
