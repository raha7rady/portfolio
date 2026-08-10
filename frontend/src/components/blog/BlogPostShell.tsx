"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
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

export default function BlogPostShell({
  meta,
  children,
}: {
  meta: BlogPostMeta;
  children: ReactNode;
}) {
  const { locale, dict } = useLocale();

  return (
    <div className="page-container section-spacing max-w-2xl">
      <Link href="/blog" className="text-sm text-muted hover:text-accent">
        ← {dict.blog.back}
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-foreground">{meta.title}</h1>

      <p className="mt-2 text-sm text-muted">
        {formatDate(meta.date, locale)} · {meta.readingTimeMinutes} {dict.blog.minRead}
      </p>

      {meta.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {meta.tags.map((tag) => (
            <li key={tag}>
              <Badge tone="neutral">{tag}</Badge>
            </li>
          ))}
        </ul>
      )}

      {/* بدنه مقاله طبق تصمیم فاز ۷ (هم‌راستا با تصمیم مشابه در Case Study فاز ۶) فعلاً فقط فارسی است */}
      {locale === "en" && (
        <Card className="mt-8 border-accent/40 bg-accent/5">
          <p className="text-sm text-accent">{dict.blog.notTranslatedNotice}</p>
        </Card>
      )}

      <div dir="rtl">{children}</div>
    </div>
  );
}
