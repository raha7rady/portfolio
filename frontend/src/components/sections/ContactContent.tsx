"use client";

import ContactForm from "@/components/sections/ContactForm";
import FadeIn from "@/components/ui/FadeIn";
import { SOCIAL_LINKS } from "@/data/social";
import { useLocale } from "@/hooks/useLocale";

export default function ContactContent() {
  const { dict } = useLocale();

  return (
    <div className="page-container section-spacing">
      <div className="grid gap-12 md:grid-cols-2">
        <FadeIn>
          <h1 className="text-3xl font-bold text-foreground">{dict.contact.title}</h1>
          <p className="mt-3 max-w-md text-muted">{dict.contact.description}</p>

          <ul className="mt-6 flex flex-wrap gap-4">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-accent hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.1}>
          <ContactForm />
        </FadeIn>
      </div>
    </div>
  );
}
