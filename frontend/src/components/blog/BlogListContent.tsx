"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Clock } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
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

export default function BlogListContent({ posts }: { posts: BlogPostMeta[] }) {
  const { locale, dict } = useLocale();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }, [posts, query]);

  return (
    <div className="page-container section-spacing">
      <SectionHeader
        tag={dict.blog.tag}
        title={dict.blog.title}
        subtitle={dict.blog.description}
        align="left"
      />

      <div className="relative mb-10 max-w-md">
        <Search
          size={16}
          className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={dict.blog.searchPlaceholder}
          className="w-full rounded-xl border border-border bg-surface py-2.5 ps-10 pe-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <div className="space-y-6">
        {filtered.map((post, index) => (
          <FadeIn key={post.slug} delay={index * 0.05}>
            <Card variant="interactive">
              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="text-lg font-semibold text-foreground transition-colors hover:text-accent">
                  {post.title}
                </h2>
              </Link>

              <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                <span>{formatDate(post.date, locale)}</span>
                <span>·</span>
                <Clock size={12} />
                <span>
                  {post.readingTimeMinutes} {dict.blog.minRead}
                </span>
              </p>

              <p className="mt-3 text-sm leading-6 text-foreground/90">{post.excerpt}</p>

              {post.tags.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <Badge tone="neutral" size="sm">
                        {tag}
                      </Badge>
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

        {filtered.length === 0 && (
          <p className="text-sm text-muted">{dict.blog.searchPlaceholder}</p>
        )}
      </div>
    </div>
  );
}
