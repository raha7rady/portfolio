import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";
import { SOCIAL_LINKS } from "@/data/social";

export const metadata: Metadata = {
  title: "تماس | ساناز دربندی",
};

export default function ContactPage() {
  return (
    <div className="page-container section-spacing">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold text-foreground">بیایید صحبت کنیم</h1>
          <p className="mt-3 max-w-md text-muted">
            چه فرصت شغلی مطرح باشد، چه سؤالی درباره پروژه‌هایم — خوشحال می‌شوم
            پیام شما را دریافت کنم.
          </p>

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
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
