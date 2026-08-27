import type { ReactNode } from "react";

type Variant = "surface" | "glow" | "interactive";

const VARIANT_CLASSES: Record<Variant, string> = {
  surface: "border-border bg-surface",
  glow:
    "border-accent/25 bg-gradient-to-b from-surface to-background shadow-[0_0_30px_-10px_rgb(var(--color-accent)/0.2)]",
  interactive:
    "border-border bg-surface hover:border-accent/40 hover:-translate-y-0.5 hover:shadow-xl cursor-pointer",
};

export default function Card({
  children,
  className = "",
  variant = "surface",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border p-6 transition-all duration-200 ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
