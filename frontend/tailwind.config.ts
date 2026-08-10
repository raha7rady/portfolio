import type { Config } from "tailwindcss";

// نکته مهم فاز ۶: مقادیر رنگ دیگر Hex ثابت نیستند، بلکه به CSS Custom Properties
// تعریف‌شده در globals.css (:root برای روشن، .dark برای تیره) وصل‌اند.
// نام کلاس‌ها (bg-background, text-foreground, border-accent/40, ...) دقیقاً همان‌هایی
// هستند که در فازهای ۲ تا ۵ استفاده شدند — یعنی هیچ کامپوننت قدیمی نیاز به تغییر ندارد،
// فقط مقدار پشت‌صحنه‌ی رنگ‌ها بسته به روشن/تیره بودن عوض می‌شود.
const withOpacity = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: withOpacity("--color-background"),
        surface: withOpacity("--color-surface"),
        foreground: withOpacity("--color-foreground"),
        muted: withOpacity("--color-muted"),
        accent: withOpacity("--color-accent"),
        accent2: withOpacity("--color-accent2"),
        success: withOpacity("--color-success"),
        danger: withOpacity("--color-danger"),
        border: withOpacity("--color-border"),
      },
      fontFamily: {
        vazir: ["var(--font-vazirmatn)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      spacing: {
        section: "5rem",
        "section-mobile": "3rem",
      },
      borderRadius: {
        card: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
