"use client";

import { Layers, Server, ShieldCheck, Database } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { useLocale } from "@/hooks/useLocale";

export default function StatsStrip() {
  const { dict } = useLocale();

  const items = [
    {
      icon: <Layers size={22} className="text-accent" />,
      title: dict.hero.stats.architecture,
      subtitle: dict.hero.stats.architectureSub,
      detail: dict.hero.stats.architectureDetail,
    },
    {
      icon: <Server size={22} className="text-accent2" />,
      title: dict.hero.stats.apis,
      subtitle: dict.hero.stats.apisSub,
      detail: dict.hero.stats.apisDetail,
    },
    {
      icon: <Database size={22} className="text-amber-500" />,
      title: dict.hero.stats.database,
      subtitle: dict.hero.stats.databaseSub,
      detail: dict.hero.stats.databaseDetail,
    },
    {
      icon: <ShieldCheck size={22} className="text-success" />,
      title: dict.hero.stats.testing,
      subtitle: dict.hero.stats.testingSub,
      detail: dict.hero.stats.testingDetail,
    },
  ];

  return (
    <section className="page-container -mt-2 pb-4">
      <FadeIn className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="group flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 text-start shadow-sm transition-all hover:border-accent/40 hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl border border-border bg-background p-3 transition-transform group-hover:scale-105">
                {item.icon}
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground transition-colors group-hover:text-accent">
                {item.title}
              </h3>
              <p className="mt-1 text-xs font-medium text-muted">{item.subtitle}</p>
              <p className="mt-2 border-t border-border pt-2 text-[11px] leading-relaxed text-muted/80">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </FadeIn>
    </section>
  );
}