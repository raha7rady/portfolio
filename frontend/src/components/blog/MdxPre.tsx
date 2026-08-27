"use client";

import { useState, type ReactNode } from "react";
import { Copy, Check } from "lucide-react";

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    // @ts-expect-error -- narrowing react children at runtime
    return extractText(node.props.children);
  }
  return "";
}

export default function MdxPre({ children }: { children: ReactNode }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(extractText(children));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div dir="ltr" className="ltr mt-4 overflow-hidden rounded-card border border-border">
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[11px] font-medium text-muted transition-colors hover:text-foreground"
        >
          {copied ? <Check size={13} className="text-success" /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm">{children}</pre>
    </div>
  );
}
