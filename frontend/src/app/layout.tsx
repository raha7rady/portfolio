import type { Metadata } from "next";
import { Inter, Vazirmatn } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AppInitScript from "@/components/layout/AppInitScript";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import AnalyticsPageView from "@/components/analytics/AnalyticsPageView";
import { LocaleProvider } from "@/hooks/useLocale";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import "@/styles/globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const DESCRIPTION_FA =
  "پورتفولیو ساناز دربندی — توسعه‌دهنده Backend با تمرکز بر C# و ASP.NET Core.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s",
  },
  description: DESCRIPTION_FA,
  keywords: [
    "Sanaz Darbandi",
    "ساناز دربندی",
    ".NET Developer",
    "ASP.NET Core",
    "ASP.NET Core Web API",
    "C# Developer",
    "Backend Developer",
    "توسعه‌دهنده بک‌اند",
    "Entity Framework Core",
    "Clean Architecture",
    "CQRS",
    "Junior .NET Developer",
  ],
  authors: [{ name: "Sanaz Darbandi" }],
  openGraph: {
    type: "website",
    locale: "fa_IR",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DESCRIPTION_FA,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sanaz Darbandi — Junior .NET Backend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DESCRIPTION_FA,
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (

    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <AppInitScript />
      </head>
      <body className="flex min-h-screen flex-col">
        <GoogleAnalytics />
        <LocaleProvider>
          <AnalyticsPageView />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
