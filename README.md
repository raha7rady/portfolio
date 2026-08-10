# ساناز — Developer Portfolio


[![Frontend CI](https://github.com/raha7rady/portfolio/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/raha7rady/portfolio/actions/workflows/frontend-ci.yml)
[![Backend CI](https://github.com/raha7rady/portfolio/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/raha7rady/portfolio/actions/workflows/backend-ci.yml)

پورتفولیوی شخصی من — یک اپلیکیشن Full-Stack شامل فرانت‌اند Next.js و بک‌اند ASP.NET Core، با Case Study کامل برای هر پروژه (نه فقط لیست تکنولوژی) و یک بلاگ فنی با یادداشت‌های واقعی از تجربه‌ی ساخت StudentInsights.

**🔗 Live Demo:** [sanaz.dev](https://samaz.dev) _(بعد از فاز ۱۱ با دامنه واقعی جایگزین شود)_

---

## اسکرین‌شات‌ها

> بعد از دیپلوی نهایی (فاز ۱۱)، اسکرین‌شات واقعی از صفحه Home (حالت تیره و روشن) و صفحه Case Study اینجا اضافه می‌شود. فایل‌ها را در `docs/screenshots/` بگذار و لینک‌شان را جایگزین این بخش کن، مثلاً:
>
> ```md
> ![Home - Dark Mode](docs/screenshots/home-dark.png)
> ![Case Study](docs/screenshots/case-study.png)
> ```

---

## استک فنی

**Frontend:** Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · next-mdx-remote
**Backend:** ASP.NET Core Minimal API · Entity Framework Core · SQLite
**زیرساخت:** Docker · GitHub Actions (CI) · Vercel · Render

معماری کامل (دیاگرام‌ها، جریان درخواست‌ها، و دلیل هر تصمیم فنی) در [`docs/architecture.md`](docs/architecture.md).

---

## ویژگی‌های کلیدی

- Case Study کامل برای هر پروژه (Problem, Architecture, My Role, Key Decisions, Challenges & Solutions) — نه فقط یک کارت با اسم تکنولوژی
- دو زبانه (فارسی/انگلیسی) با تغییر جهت خودکار صفحه (RTL/LTR)
- حالت تیره/روشن با ذخیره ترجیح کاربر
- بلاگ فنی با MDX و رنگ‌آمیزی Syntax برای بلوک‌های کد
- فرم Contact واقعی با بک‌اند ASP.NET Core (نه یک سرویس فرم بیرونی)
- SEO کامل: Sitemap پویا، Metadata اختصاصی هر صفحه، OG Image سفارشی
- CI خودکار برای هر دو بخش فرانت‌اند و بک‌اند

---

## اجرای محلی

### پیش‌نیازها
Node.js 20+، npm، .NET 8 SDK، (اختیاری) Docker

### روش ۱ — اجرای جدا (بدون Docker)

```bash
# فرانت‌اند
cd frontend
npm install
cp .env.local.example .env.local   # و در صورت نیاز مقادیر را ویرایش کن
npm run dev
```

```bash
# بک‌اند (در یک ترمینال جدا)
cd backend
dotnet restore
dotnet tool install --global dotnet-ef   # فقط بار اول
dotnet ef database update --project src/Portfolio.Infrastructure --startup-project src/Portfolio.Api
dotnet run --project src/Portfolio.Api
```

سایت روی `http://localhost:3000` و API روی آدرسی که ترمینال چاپ می‌کند (Swagger در `/swagger`) در دسترس است.

### روش ۲ — با Docker Compose (هر دو سرویس با هم)

```bash
cp .env.example .env   # و مقادیر واقعی SMTP را در صورت نیاز پر کن
docker compose up --build
```

### تست‌ها

```bash
# فرانت‌اند
cd frontend && npm run typecheck && npm run lint

# بک‌اند
cd backend && dotnet test
```

---

## ساختار پروژه

```
frontend/          Next.js app
  src/app/            صفحات (App Router)
  src/components/     کامپوننت‌های UI، بخش‌ها، بلاگ، پروژه‌ها
  src/data/           داده Static (پروژه‌ها، مهارت‌ها، لینک‌های اجتماعی)
  src/content/blog/   پست‌های بلاگ (MDX)
  src/hooks/          useLocale، useTheme
  src/i18n/           دیکشنری فارسی/انگلیسی

backend/            ASP.NET Core API
  src/Portfolio.Api/            کنترلرها، Program.cs
  src/Portfolio.Application/    منطق برنامه (بدون وابستگی فریم‌ورک)
  src/Portfolio.Infrastructure/ EF Core، SMTP
  tests/Portfolio.Tests/        تست‌های xUnit

docs/               اسناد طراحی و معماری
  content-plan.md       پیش‌نویس محتوای هر صفحه (فاز ۱)
  color-typography.md   پالت رنگی و تایپوگرافی (فاز ۱)
  architecture.md        معماری کامل با دیاگرام (فاز ۱۲)
  wireframes/            چیدمان متنی هر صفحه (فاز ۱)
```

---

## نقشه راه توسعه

این پروژه در ۱۲ فاز مشخص ساخته شد — از طراحی اولیه تا دیپلوی نهایی. جزئیات کامل هر فاز (تصمیمات معماری، فایل‌های هر مرحله) در تاریخچه توسعه پروژه مستند است.
