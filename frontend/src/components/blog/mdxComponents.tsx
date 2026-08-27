import type { MDXComponents } from "mdx/types";
import MdxPre from "@/components/blog/MdxPre";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-10 text-xl font-semibold text-foreground" {...props} />
  ),
  h3: (props) => <h3 className="mt-8 text-lg font-semibold text-foreground" {...props} />,
  p: (props) => <p className="mt-4 leading-8 text-foreground/90" {...props} />,
  ul: (props) => (
    <ul className="mt-4 list-inside list-disc space-y-2 text-foreground/90" {...props} />
  ),
  ol: (props) => (
    <ol
      className="mt-4 list-inside list-decimal space-y-2 text-foreground/90"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-accent hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-4 rounded-lg border-r-4 border-accent/40 bg-surface py-2 pr-4 text-muted"
      {...props}
    />
  ),
  code: (props) => (
    <code className="rounded bg-surface px-1.5 py-0.5 text-sm" {...props} />
  ),
  pre: ({ children }) => <MdxPre>{children}</MdxPre>,
};
