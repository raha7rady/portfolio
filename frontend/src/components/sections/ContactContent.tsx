"use client";

import { useState } from "react";
import {
  Github,
  Mail,
  MapPin,
  Clock,
  Copy,
  Check,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import ContactForm from "@/components/sections/ContactForm";
import { SOCIAL_LINKS } from "@/data/social";
import { useLocale } from "@/hooks/useLocale";

export default function ContactContent() {
  const { dict } = useLocale();
  const [copiedField, setCopiedField] = useState<"email" | "phone" | null>(
    null
  );

  const githubLink = SOCIAL_LINKS.find((l) => l.label === "GitHub");
  const linkedinLink = SOCIAL_LINKS.find((l) => l.label === "LinkedIn");
  const emailLink = SOCIAL_LINKS.find((l) => l.label === "Email");

  const email = emailLink?.href.replace("mailto:", "") ?? "";

  function handleCopy(field: "email" | "phone", value: string) {
    navigator.clipboard.writeText(value);
    setCopiedField(field);

    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  }

  return (
    <div className="page-container section-spacing">
      <SectionHeader
        tag={dict.contact.tag}
        title={dict.contact.title}
        subtitle={dict.contact.description}
        align="left"
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-6">
          <Card>
            <h2 className="text-sm font-semibold text-foreground">
              {dict.contact.directChannelsTitle}
            </h2>

            <div className="mt-4 flex flex-col gap-3">
              {emailLink && (
                <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-foreground/90 transition-colors hover:border-accent/40">
                  <Mail size={16} className="shrink-0 text-accent" />

                  <a
                    href={emailLink.href}
                    className="min-w-0 flex-1 truncate hover:text-accent"
                  >
                    {email}
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy("email", email)}
                    className="shrink-0 rounded-lg p-1.5 text-muted transition-colors hover:bg-surface hover:text-accent"
                    title="Copy email"
                    aria-label="Copy email"
                  >
                    {copiedField === "email" ? (
                      <Check size={14} className="text-success" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              )}

              {githubLink && (
                <a
                  href={githubLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-foreground/90 transition-colors hover:border-accent/40"
                >
                  <Github size={16} className="shrink-0 text-accent" />
                  <span className="min-w-0 truncate">
                    {githubLink.href.replace("https://", "")}
                  </span>
                </a>
              )}

              {linkedinLink && (
                <a
                  href={linkedinLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-foreground/90 transition-colors hover:border-accent/40"
                >
                  <span className="shrink-0 text-accent">in</span>
                  <span className="min-w-0 truncate">
                    {linkedinLink.href.replace("https://", "")}
                  </span>
                </a>
              )}
            </div>

            <p className="mt-3 text-xs text-muted">
              {dict.contact.githubNotice}
            </p>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-foreground">
              {dict.contact.availabilityTitle}
            </h2>

            <Badge tone="success" dot size="sm" className="mt-3">
              {dict.footer.availableBadge}
            </Badge>

            <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-muted">
              <Clock size={15} className="mt-0.5 shrink-0 text-accent" />
              <span>{dict.contact.availabilityStatus}</span>
            </p>

            <p className="mt-2 flex items-center gap-2 text-sm text-muted">
              <MapPin size={15} className="shrink-0 text-accent" />
              <span>{dict.contact.location}</span>
            </p>
          </Card>
        </div>

        <Card variant="glow">
          <ContactForm />
        </Card>
      </div>
    </div>
  );
}