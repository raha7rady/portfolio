import type { Metadata } from "next";
import ContactContent from "@/components/sections/ContactContent";

export const metadata: Metadata = {
  title: "تماس | ساناز دربندی",
  description: "برای فرصت‌های شغلی یا سؤال درباره پروژه‌ها با ساناز دربندی در تماس باشید.",
};

export default function ContactPage() {
  return <ContactContent />;
}
