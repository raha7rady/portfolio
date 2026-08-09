import type { Metadata } from "next";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "درباره من | مهتا",
};

export default function AboutPage() {
  return (
    <div className="page-container section-spacing">
      <h1 className="text-3xl font-bold text-foreground">درباره من</h1>

      <div className="mt-8 grid gap-10 md:grid-cols-[220px_1fr]">
        {/* آواتار موقت — تا وقتی عکس واقعی جایگزین شود (طبق نکات باز فاز ۱) */}
        <div
          aria-hidden
          className="flex h-48 w-48 items-center justify-center rounded-card bg-gradient-to-br from-accent/20 to-accent2/20 text-5xl font-bold text-accent"
        >
          م
        </div>

        <div>
          <p className="leading-8 text-foreground/90">
            از دوران دانشجویی مهندسی کامپیوتر در دانشگاه خوارزمی، جذب دنیای
            Backend شدم — جایی که منطق واقعی یک سیستم شکل می‌گیرد. تمرکز
            اصلی من C# و ASP.NET Core است، و در پروژه StudentInsights تجربه‌ی
            طراحی معماری Clean Architecture، پیاده‌سازی CQRS، و یکپارچه‌سازی
            Backend با یک Frontend مبتنی بر React و یک سرویس تحلیل داده در
            Python را به‌دست آوردم.
          </p>

          <p className="mt-4 leading-8 text-foreground/90">
            علاوه بر Backend، به طراحی وب، UI/UX و توسعه بازی هم علاقه‌مندم و
            همیشه در حال یادگیری تکنولوژی‌های جدید هستم. باور دارم بهترین
            یادگیری از ساختن پروژه‌های واقعی و حل مسائل واقعی به‌دست
            می‌آید — نه فقط دوره دیدن.
          </p>

          <Card className="mt-8">
            <h2 className="text-lg font-semibold text-foreground">تحصیلات</h2>
            <p className="mt-2 text-sm text-muted">
              کارشناسی مهندسی کامپیوتر — دانشگاه خوارزمی
            </p>
            <p className="text-sm text-muted">ورودی ۱۴۰۲ — در حال تحصیل</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
