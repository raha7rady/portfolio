"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeader from "@/components/ui/SectionHeader";
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

export default function LatestBlogSection({ posts }: { posts: BlogPostMeta[] }) {
  const { locale, dict } = useLocale();

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="page-container section-spacing border-t border-border">
      <SectionHeader
        tag={dict.latestBlog.tag}
        title={dict.latestBlog.heading}
        subtitle={dict.latestBlog.description}
        align="left"
      />

      <FadeIn className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <Card key={post.slug} variant="interactive">
            <Link href={`/blog/${post.slug}`}>
              <h3 className="text-lg font-semibold text-foreground transition-colors hover:text-accent">
                {post.title}
              </h3>
            </Link>
            <p className="mt-2 text-xs text-muted">
              {formatDate(post.date, locale)} · {post.readingTimeMinutes} {dict.latestBlog.minRead}
            </p>
            <p className="mt-3 text-sm leading-6 text-foreground/90">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 inline-block text-sm font-semibold text-accent hover:underline"
            >
              {dict.latestBlog.readMore} ←
            </Link>
          </Card>
        ))}
      </FadeIn>

      <div className="mt-8 flex justify-center">
        <Button href="/blog" variant="outline" size="md">
          {dict.latestBlog.viewAll}
        </Button>
      </div>
    </section>
  );
}
