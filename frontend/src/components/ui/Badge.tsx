import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "success";

const TONE_CLASSES: Record<Tone, string> = {
  neutral: "border-border text-muted",
  accent: "border-accent/40 text-accent",
  success: "border-success/40 text-success",
};

export default function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
