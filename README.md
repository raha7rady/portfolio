# ساناز دربندی — Developer Portfolio

[![Frontend CI](https://github.com/raha7rady/portfolio/actions/workflows/frontend-ci.yml/badge.svg)](https://github.com/raha7rady/portfolio/actions/workflows/frontend-ci.yml)
[![Backend CI](https://github.com/raha7rady/portfolio/actions/workflows/backend-ci.yml/badge.svg)](https://github.com/raha7rady/portfolio/actions/workflows/backend-ci.yml)

پورتفولیوی شخصی من — یک اپلیکیشن Full-Stack شامل فرانت‌اند Next.js و بک‌اند ASP.NET Core، با Case Study کامل برای هر پروژه و یک بلاگ فنی.

## استک فنی

**Frontend:** Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion · next-mdx-remote
**Backend:** ASP.NET Core Minimal API · Entity Framework Core · SQLite
**زیرساخت:** Docker · GitHub Actions (CI)

## اجرای محلی

جزئیات کامل نصب و اجرا (با یا بدون Docker) در `docs/` و در چک‌لیست‌های هر فاز پروژه آمده است. خلاصه سریع:

```bash
# فرانت‌اند
cd frontend
npm install
npm run dev

# بک‌اند (در یک ترمینال جدا)
cd backend
dotnet restore
dotnet run --project src/Portfolio.Api
```

یا با Docker Compose (هر دو سرویس با هم):

```bash
cp .env.example .env   # و مقادیر واقعی را پر کن
docker compose up --build
```

## ساختار پروژه

```
frontend/   Next.js app (UI, صفحات، بلاگ MDX)
backend/    ASP.NET Core API (فرم Contact)
docs/       اسناد طراحی و معماری پروژه
```

مستندات کامل‌تر (معماری، تصمیمات طراحی) در `docs/architecture.md` قرار خواهد گرفت.
