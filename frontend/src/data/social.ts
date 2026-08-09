export type SocialLink = {
  label: string;
  href: string;
};

// TODO (نکات باز فاز ۱): با لینک‌های واقعی GitHub/LinkedIn/Email جایگزین شود
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "Email", href: "mailto:example@example.com" },
];
