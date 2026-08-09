import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // مقادیر مستقیماً از docs/color-typography.md (فاز ۱)
        background: {
          DEFAULT: "#0B0F14",
          light: "#FAFAFA",
        },
        surface: {
          DEFAULT: "#12171F",
          light: "#FFFFFF",
        },
        foreground: {
          DEFAULT: "#E6EAF0",
          light: "#111827",
        },
        muted: {
          DEFAULT: "#8B95A5",
          light: "#6B7280",
        },
        accent: {
          DEFAULT: "#22D3EE",
          light: "#0891B2",
        },
        accent2: {
          DEFAULT: "#6366F1",
          light: "#4F46E5",
        },
        success: "#34D399",
        danger: "#F87171",
        border: {
          DEFAULT: "#1F2733",
          light: "#E5E7EB",
        },
      },
      fontFamily: {
        // اعمال واقعی فونت‌ها روی body در globals.css انجام می‌شود
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
