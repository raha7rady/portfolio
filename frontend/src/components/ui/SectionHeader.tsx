import type { ReactNode } from "react";
import Badge from "@/components/ui/Badge";

export default function SectionHeader({
  tag,
  title,
  subtitle,
  align = "center",
  action,
  className = "",
}: {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
}) {
  const alignClasses = align === "left" ? "items-start text-start" : "items-center text-center";

  return (
    <div className={`mb-10 flex flex-col ${alignClasses} ${className}`}>
      {tag && (
        <Badge tone="accent" dot size="md" className="mb-3">
          {tag}
        </Badge>
      )}
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className={`flex max-w-3xl flex-col ${alignClasses}`}>
          <h2 className="text-2xl font-extrabold leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
