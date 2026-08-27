"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Share2, Check } from "lucide-react";
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
  const isRtl = locale === "fa";
  const [copied, setCopied] = useState(false);

  function handleShare() {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="page-container section-spacing max-w-2xl">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
      >
        {isRtl ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
        {dict.blog.back}
      </Link>

      <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
        {meta.title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
        <span>
          {dict.blog.publishedOn} {formatDate(meta.date, locale)}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {meta.readingTimeMinutes} {dict.blog.minRead}
        </span>
      </div>

      {meta.tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {meta.tags.map((tag) => (
            <li key={tag}>
              <Badge tone="neutral" size="sm">
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={handleShare}
        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2 text-xs font-semibold text-muted transition-colors hover:text-foreground"
      >
        {copied ? <Check size={14} className="text-success" /> : <Share2 size={14} />}
        {copied ? dict.blog.copiedToast : dict.blog.shareTitle}
      </button>

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
