export type SocialLink = {
  label: string;
  href: string;
};

// GitHub و Email از رزومه واقعی وارد شدند؛ LinkedIn طبق رزومه هنوز "در حال ساخت" است —
// وقتی آماده شد، این placeholder را با لینک واقعی جایگزین کن.
export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/raha7rady" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "Email", href: "mailto:sanaz7rn@gmail.com" },
];
