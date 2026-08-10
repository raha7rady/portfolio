import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const WORDS_PER_MINUTE = 200;

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string; // ISO — مثلاً "2026-03-02"
  excerpt: string;
  tags: string[];
  readingTimeMinutes: number;
};

export type BlogPost = {
  meta: BlogPostMeta;
  content: string; // بدنه خام Markdown/MDX، بدون frontmatter
};

function calculateReadingTime(content: string): number {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}

function getSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readPostFile(slug: string): BlogPost {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: data.title as string,
      date: data.date as string,
      excerpt: data.excerpt as string,
      tags: (data.tags as string[] | undefined) ?? [],
      readingTimeMinutes: calculateReadingTime(content),
    },
    content,
  };
}

export function getAllPostsMeta(): BlogPostMeta[] {
  return getSlugs()
    .map((slug) => readPostFile(slug).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return readPostFile(slug);
}
