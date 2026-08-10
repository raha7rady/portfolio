# معماری پروژه

این سند تصویر کامل معماری سایت را نشان می‌دهد — هم فرانت‌اند، هم بک‌اند، هم نحوه ارتباطشان با هم و با سرویس‌های بیرونی.

---

## ۱. نمای کلی سیستم (Deployment Topology)

```mermaid
flowchart LR
    subgraph Client["مرورگر کاربر"]
        Browser
    end

    subgraph Vercel["Vercel"]
        Frontend["Next.js App (App Router, SSG)"]
    end

    subgraph Render["Render"]
        Backend["ASP.NET Core API (Docker)"]
        DB[("SQLite - portfolio.db")]
    end

    subgraph External["سرویس‌های بیرونی"]
        SMTP["SMTP Server"]
        GA["Google Analytics 4"]
    end

    subgraph CI["GitHub Actions"]
        FCI["frontend-ci.yml"]
        BCI["backend-ci.yml"]
    end

    Browser -->|HTTPS| Frontend
    Browser -->|POST /api/contact| Backend
    Backend --> DB
    Backend -->|ارسال ایمیل| SMTP
    Browser -.->|Pageview Events| GA

    FCI -.->|Build/Lint/Test| Frontend
    BCI -.->|Build/Test| Backend
```

**نکته کلیدی:** فراخوانی `NEXT_PUBLIC_API_URL` مستقیماً از **مرورگر کاربر** به سرویس Render انجام می‌شود — نه از سرور Vercel. به همین دلیل CORS در بک‌اند (`Cors__AllowedOrigin`) باید دقیقاً آدرس دامنه فرانت‌اند را داشته باشد.

---

## ۲. معماری فرانت‌اند (Next.js)

```mermaid
flowchart TB
    Layout["app/layout.tsx - Root (fonts, AppInitScript, LocaleProvider)"]

    Layout --> Home["app/page.tsx"]
    Layout --> About["app/about/page.tsx"]
    Layout --> Skills["app/skills/page.tsx"]
    Layout --> Projects["app/projects/page.tsx"]
    Layout --> CaseStudy["app/projects/[slug]/page.tsx"]
    Layout --> Blog["app/blog/page.tsx"]
    Layout --> BlogPost["app/blog/[slug]/page.tsx"]
    Layout --> Contact["app/contact/page.tsx"]

    subgraph DataLayer["لایه داده Static"]
        ProjectsData["data/projects.ts"]
        SkillsData["data/skills.ts"]
        SocialData["data/social.ts"]
        MdxLib["lib/mdx.ts - خواندن content/blog"]
    end

    subgraph I18nTheme["زیرساخت زبان و تم"]
        LocaleHook["hooks/useLocale.tsx - Context + fa.json/en.json"]
        ThemeHook["hooks/useTheme.ts"]
        InitScript["AppInitScript - جلوگیری از FOUC"]
    end

    CaseStudy --> ProjectsData
    Projects --> ProjectsData
    Skills --> SkillsData
    Blog --> MdxLib
    BlogPost --> MdxLib
```

**الگوی هر صفحه (از فاز ۶ به بعد):** `page.tsx` یک Server Component است (برای `metadata` و خواندن داده)، و رندر واقعی را به یک `XContent.tsx` جدا (Client Component که از `useLocale` استفاده می‌کند) واگذار می‌کند. مثلاً `about/page.tsx` → `AboutContent.tsx`.

### تصمیم‌های کلیدی فرانت‌اند
- **رنگ‌ها:** به‌جای Hex ثابت، از CSS Custom Properties استفاده می‌شود (`:root` برای روشن، `.dark` برای تیره) — Tailwind فقط به آن‌ها ارجاع می‌دهد (`docs/color-typography.md`, فاز ۶).
- **زبان:** یک مسیر واحد (نه `/fa` و `/en` جدا)؛ سوییچ زبان کاملاً سمت کلاینت با Context انجام می‌شود. بدنه بلند محتوای فنی (Case Study، پست‌های بلاگ) عمداً فقط فارسی مانده (تصمیم فاز ۶ و ۷).
- **داده:** پروژه‌ها و مهارت‌ها در فایل‌های TypeScript static (`data/`) نگه‌داری می‌شوند — نه CMS یا دیتابیس؛ بلاگ در فایل‌های MDX (`content/blog/`) با Frontmatter.

---

## ۳. معماری بک‌اند (ASP.NET Core)

```mermaid
flowchart TB
    subgraph Api["Portfolio.Api"]
        Program["Program.cs - DI, CORS, Swagger"]
        Endpoint["Endpoints/ContactEndpoints.cs - POST /api/contact"]
    end

    subgraph Application["Portfolio.Application - بدون وابستگی به EF Core/ASP.NET"]
        Dto["ContactRequestDto"]
        Validator["ContactRequestValidator"]
        Service["ContactService"]
        IRepo["IContactMessageRepository"]
        IEmail["IEmailNotifier"]
    end

    subgraph Infrastructure["Portfolio.Infrastructure"]
        Repo["ContactMessageRepository"]
        DbCtx["PortfolioDbContext (EF Core)"]
        EmailImpl["EmailSender (SMTP)"]
    end

    DB[("SQLite")]

    Endpoint --> Service
    Service --> Validator
    Service --> IRepo
    Service --> IEmail
    IRepo -.implemented by.-> Repo
    IEmail -.implemented by.-> EmailImpl
    Repo --> DbCtx --> DB
```

### چرا سه‌لایه ساده، نه Clean Architecture کامل؟
StudentInsights (پروژه اصلی من) از Clean Architecture + CQRS استفاده می‌کند چون چند نفر روی ماژول‌های متعدد کار می‌کردند. این بک‌اند فقط یک فرم Contact دارد — همان سطح پیچیدگی برایش Over-engineering بود. این ساختار سبک‌تر (Api → Application → Infrastructure) پیچیدگی متناسب با مقیاس واقعی مسئله را نشان می‌دهد؛ جزئیات این تصمیم در تاریخچه فاز ۲ پروژه مستند است.

---

## ۴. جریان کامل یک درخواست Contact

```mermaid
sequenceDiagram
    participant U as کاربر (مرورگر)
    participant F as ContactForm.tsx
    participant A as lib/api.ts
    participant E as ContactEndpoints
    participant S as ContactService
    participant V as ContactRequestValidator
    participant R as ContactMessageRepository
    participant DB as SQLite
    participant M as EmailSender

    U->>F: پر کردن و ارسال فرم
    F->>A: submitContactForm()
    A->>E: POST /api/contact
    E->>S: SubmitAsync(request)
    S->>V: Validate(request)
    alt نامعتبر
        V-->>S: لیست خطاها
        S-->>E: ContactResult.Failure
        E-->>A: 400 Bad Request
        A-->>F: نمایش خطا
    else معتبر
        V-->>S: بدون خطا
        S->>R: AddAsync(submission)
        R->>DB: INSERT
        S->>M: NotifyNewContactAsync (best-effort)
        Note over S,M: خطای ایمیل کل درخواست را Fail نمی‌کند
        S-->>E: ContactResult.Success
        E-->>A: 200 OK
        A-->>F: نمایش پیام موفقیت
    end
```

---

## ۵. جمع‌بندی تصمیمات معماری مهم پروژه

| تصمیم | چرا |
|---|---|
| Next.js به‌جای React خام | SEO، پیش‌نمایش لینک (OG)، بلاگ قابل ایندکس (فاز ۲) |
| ۳-لایه سبک به‌جای Clean Architecture کامل | تناسب پیچیدگی با مقیاس واقعی این سرویس (فاز ۲) |
| SQLite به‌جای SQL Server | کافی برای حجم داده این پروژه، بدون نیاز به سرور دیتابیس جدا (فاز ۲) |
| Monorepo واحد | ارائه حرفه‌ای‌تر در GitHub، مدیریت ساده‌تر Issue/PR (فاز ۲) |
| بلاگ با فایل MDX، نه CMS/دیتابیس | سادگی؛ بدون نیاز به دیتابیس یا پنل مدیریت جدا (فاز ۲ و ۷) |
| زبان: مسیر واحد + Context، نه روت‌های /fa و /en | سادگی معماری؛ محتوای بلند فنی فقط فارسی می‌ماند (فاز ۶) |
| رنگ‌ها: CSS Variables به‌جای Hex ثابت | امکان Dark/Light واقعی بدون تغییر نام کلاس‌ها (فاز ۶) |
