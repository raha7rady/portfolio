import type { Metadata } from "next";
import BlogListContent from "@/components/blog/BlogListContent";
import { getAllPostsMeta } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "بلاگ | ساناز دربندی",
  description:
    "یادداشت‌های فنی ساناز دربندی درباره Clean Architecture، CQRS و تجربه‌های واقعی توسعه Backend.",
};

export default function BlogPage() {
  const posts = getAllPostsMeta();
  return <BlogListContent posts={posts} />;
}
