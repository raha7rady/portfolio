import type { ReactNode } from "react";

type Tone = "neutral" | "accent" | "success" | "danger" | "indigo";

const TONE_CLASSES: Record<Tone, string> = {
  neutral: "border-border text-muted bg-muted/10",
  accent: "border-accent/30 text-accent bg-accent/10",
  success: "border-success/30 text-success bg-success/10",
  danger: "border-danger/30 text-danger bg-danger/10",
  indigo: "border-accent2/30 text-accent2 bg-accent2/10",
};

const DOT_CLASSES: Record<Tone, string> = {
  neutral: "bg-muted",
  accent: "bg-accent shadow-[0_0_8px_rgb(var(--color-accent)/0.8)]",
  success: "bg-success shadow-[0_0_8px_rgb(var(--color-success)/0.8)]",
  danger: "bg-danger shadow-[0_0_8px_rgb(var(--color-danger)/0.8)]",
  indigo: "bg-accent2 shadow-[0_0_8px_rgb(var(--color-accent2)/0.8)]",
};

const SIZE_CLASSES = {
  sm: "text-[11px] px-2.5 py-0.5 gap-1.5",
  md: "text-xs px-3 py-1 gap-2",
  lg: "text-sm px-3.5 py-1.5 gap-2",
};

export default function Badge({
  children,
  tone = "neutral",
  size = "md",
  dot = false,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium transition-colors ${TONE_CLASSES[tone]} ${SIZE_CLASSES[size]} ${className}`}
    >
      {dot && (
        <span
          className={`inline-block h-1.5 w-1.5 shrink-0 animate-pulse rounded-full ${DOT_CLASSES[tone]}`}
        />
      )}
      <span className="whitespace-nowrap">{children}</span>
    </span>
  );
}
