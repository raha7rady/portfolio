import type { Metadata } from "next";
import { Inter, Vazirmatn } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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

// متادیتای کامل SEO (Open Graph, sitemap, ...) در فاز ۸ تکمیل می‌شود؛
// فعلاً فقط عنوان و توضیح پایه برای اجرای صحیح پروژه لازم است.
export const metadata: Metadata = {
  title: "ساناز دربندی | Junior .NET Backend Developer",
  description:
    "پورتفولیو ساناز دربندی — توسعه‌دهنده Backend با تمرکز بر C# و ASP.NET Core.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
