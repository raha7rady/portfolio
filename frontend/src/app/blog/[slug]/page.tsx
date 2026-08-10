import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import BlogPostShell from "@/components/blog/BlogPostShell";
import { mdxComponents } from "@/components/blog/mdxComponents";
import { getAllPostsMeta, getPostBySlug } from "@/lib/mdx";

// نکته فنی مهم (Next.js 15): params یک Promise است و باید await شود —
// همان اصلاحی که در فاز ۹ روی مسیر Case Study پروژه‌ها هم انجام شد.
type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPostsMeta().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "مقاله یافت نشد | ساناز دربندی" };
  }

  return {
    title: `${post.meta.title} | ساناز دربندی`,
    description: post.meta.excerpt,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt,
      type: "article",
      publishedTime: post.meta.date,
      tags: post.meta.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogPostShell meta={post.meta}>
      <MDXRemote
        source={post.content}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeHighlight],
          },
        }}
      />
    </BlogPostShell>
  );
}
