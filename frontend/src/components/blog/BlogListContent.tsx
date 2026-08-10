"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/ui/FadeIn";
import { useLocale } from "@/hooks/useLocale";
import type { BlogPostMeta } from "@/lib/mdx";

function formatDate(dateIso: string, locale: "fa" | "en"): string {
  const formatter = new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formatter.format(new Date(dateIso));
}

export default function BlogListContent({ posts }: { posts: BlogPostMeta[] }) {
  const { locale, dict } = useLocale();

  return (
    <div className="page-container section-spacing">
      <h1 className="text-3xl font-bold text-foreground">{dict.blog.title}</h1>
      <p className="mt-2 max-w-2xl text-muted">{dict.blog.description}</p>

      <div className="mt-10 space-y-6">
        {posts.map((post, index) => (
          <FadeIn key={post.slug} delay={index * 0.05}>
            <Card>
              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="text-lg font-semibold text-foreground hover:text-accent">
                  {post.title}
                </h2>
              </Link>

              <p className="mt-2 text-sm text-muted">
                {formatDate(post.date, locale)} · {post.readingTimeMinutes}{" "}
                {dict.blog.minRead}
              </p>

              <p className="mt-3 text-sm leading-6 text-foreground/90">{post.excerpt}</p>

              {post.tags.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <Badge tone="neutral">{tag}</Badge>
                    </li>
                  ))}
                </ul>
              )}

              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
              >
                {dict.blog.readMore} ←
              </Link>
            </Card>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
