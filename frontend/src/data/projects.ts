export type ProjectChallenge = {
  challenge: string;
  solution: string;
};

export type LocalizedText = {
  fa: string;
  en: string;
};

export type ProjectMetric = {
  label: LocalizedText;
  value: string;
};

export type ArchitectureLayer = {
  layer: string;
  description: string;
  tech: string[];
};

export type ProjectCategory = "backend" | "fullstack";

export type Project = {
  slug: string;
  title: string;
  year: number;
  role: string;
  category: ProjectCategory;
  shortDescription: LocalizedText;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  images?: string[];
  metrics?: ProjectMetric[];
  problem: string;
  architecture: string;
  architectureLayers?: ArchitectureLayer[];
  myRole: string[];
  keyDecisions: string[];
  challenges: ProjectChallenge[];
};

export const PROJECTS: Project[] = [
  {
    slug: "student-insights",
    title: "StudentInsights (Amooino)",
    year: 1405,
    role: "Backend Developer / Team Member",
    category: "backend",

    shortDescription: {
      fa: "پلتفرم یکپارچه مدیریت زندگی تحصیلی دانشجویان با ASP.NET Core، Clean Architecture، CQRS و یک سرویس مستقل Python Analytics.",
      en: "An integrated student academic management platform built with ASP.NET Core, Clean Architecture, CQRS, and an independent Python analytics service.",
    },

    techStack: [
      "C# / .NET 8",
      "ASP.NET Core Web API",
      "Clean Architecture",
      "CQRS / MediatR",
      "Entity Framework Core 8",
      "SQL Server",
      "FluentValidation",
      "Serilog",
      "Hangfire",
      "JWT / Refresh Token",
      "Swagger / OpenAPI",
      "FastAPI / Python",
      "React",
      "Git / GitHub",
      "Postman",
    ],

    featured: true,

    githubUrl: "https://github.com/raha7rady/StudentInsights",

    images: [
      "/images/projects/student-insights/Screenshot%202026-08-26%20172441.webp",
      "/images/projects/student-insights/Screenshot%202026-08-26%20172518.webp",
      "/images/projects/student-insights/Screenshot%202026-08-26%20181852.webp",
      "/images/projects/student-insights/Screenshot%202026-08-26%20181912.webp",
      "/images/projects/student-insights/Screenshot%202026-08-26%20181926.webp",
      "/images/projects/student-insights/Screenshot%202026-08-26%20182049.webp",
      "/images/projects/student-insights/Screenshot%202026-08-26%20181946.webp",
      "/images/projects/student-insights/Screenshot%202026-08-26%20182030.webp",
      "/images/projects/student-insights/Screenshot%202026-08-26%20182241.webp",
    ],

    metrics: [
      {
        label: {
          fa: "لایه‌های Backend",
          en: "Backend Layers",
        },
        value: "4 Layers",
      },
      {
        label: {
          fa: "الگوی معماری",
          en: "Architecture Pattern",
        },
        value: "Clean + CQRS",
      },
      {
        label: {
          fa: "پایگاه داده",
          en: "Database",
        },
        value: "SQL Server",
      },
      {
        label: {
          fa: "سرویس Analytics",
          en: "Analytics Service",
        },
        value: "FastAPI / Python",
      },
    ],

    problem:
      "دانشجویان معمولاً اطلاعات مربوط به دروس، امتحانات، فعالیت‌های یادگیری، اهداف، برنامه‌های شخصی و زمان مطالعه خود را در ابزارهای مختلف و جدا از هم مدیریت می‌کنند. نتیجه این است که اطلاعات پراکنده است و دانشجو دید یکپارچه‌ای از وضعیت و روند فعالیت‌های تحصیلی خود ندارد. StudentInsights با هدف ایجاد یک پلتفرم واحد برای مدیریت، ثبت و تحلیل این اطلاعات طراحی شد تا فعالیت‌های آموزشی و شخصی مرتبط با مطالعه در یک سیستم یکپارچه قرار بگیرند.",

    architecture:
      "Backend پروژه با ASP.NET Core 8 Web API و بر پایه Clean Architecture در چهار لایه Domain، Application، Infrastructure و Web API طراحی شده است. در لایه Application از CQRS با MediatR استفاده شده و قابلیت‌های مختلف سیستم به Featureهای مستقل شامل Command، Query، DTO، Mapping و Handler تقسیم شده‌اند. منطق کسب‌وکار اصلی در Domain نگهداری می‌شود و موجودیت‌ها به‌صورت Rich Domain Model طراحی شده‌اند. Persistence از طریق انتزاع IApplicationDbContext انجام می‌شود و برخلاف پروژه SuperMarket، Repository Pattern در Backend استفاده نشده است. لایه Infrastructure مسئول پیاده‌سازی Persistence با Entity Framework Core و SQL Server و همچنین ارتباط با سرویس‌های خارجی است. Backend از طریق REST API با React ارتباط دارد و سرویس مستقل Python Analytics نیز از طریق Backend در دسترس Frontend قرار می‌گیرد.",

    architectureLayers: [
      {
        layer: "Domain Layer",
        description:
          "شامل Entityها، Value Objectها، قواعد و منطق اصلی کسب‌وکار است و تا حد امکان مستقل از فریم‌ورک، دیتابیس و جزئیات زیرساختی نگهداری می‌شود.",
        tech: [
          "C#",
          "Entities",
          "Value Objects",
          "Domain Rules",
          "Factory Methods",
        ],
      },
      {
        layer: "Application Layer",
        description:
          "Use Caseهای سیستم در این لایه و بر پایه CQRS پیاده‌سازی شده‌اند. هر عملیات خواندن یا نوشتن در قالب Command یا Query و Handler مربوط به خودش سازمان‌دهی شده است.",
        tech: [
          "CQRS",
          "MediatR",
          "Commands / Queries",
          "DTOs",
          "Mapping",
          "FluentValidation",
        ],
      },
      {
        layer: "Infrastructure Layer",
        description:
          "مسئول پیاده‌سازی Persistence، ارتباط با SQL Server، EF Core Migrations و سرویس‌های زیرساختی و ارتباطی موردنیاز سیستم است.",
        tech: [
          "Entity Framework Core 8",
          "SQL Server",
          "IApplicationDbContext",
          "Typed HttpClient",
          "Hangfire",
        ],
      },
      {
        layer: "Web API Layer",
        description:
          "لایه ورودی سیستم که APIهای RESTful، Authentication و Authorization، Middlewareها، Rate Limiting و مستندسازی API را ارائه می‌کند.",
        tech: [
          "ASP.NET Core 8",
          "REST API",
          "JWT Bearer",
          "Swagger / OpenAPI",
          "Middleware",
          "Rate Limiting",
        ],
      },
    ],

    myRole: [
      "طراحی و توسعه Backend با ASP.NET Core 8 Web API",
      "طراحی و پیاده‌سازی Clean Architecture و ساختار چهارلایه پروژه",
      "پیاده‌سازی CQRS با MediatR و سازمان‌دهی Featureها بر اساس Command، Query، DTO، Mapping و Handler",
      "طراحی دیتابیس، Entityها، روابط و Migrationهای SQL Server با Entity Framework Core",
      "پیاده‌سازی APIها و منطق Backend برای ماژول‌های Authentication، Users، Courses، Exams، Learning Activities، Goals، Personal Events، Calendar، Study Logs، Dashboard، Analytics، Notifications، Admin Panel و System Settings",
      "پیاده‌سازی Authentication و Authorization شامل JWT، Refresh Token و Role-based Access Control",
      "پیاده‌سازی Validation، Pagination، Filtering، Soft Delete، Auditing و Optimistic Concurrency",
      "پیاده‌سازی Middlewareهای Exception Handling، Correlation ID و Security Headers و استفاده از Structured Logging با Serilog",
      "پیاده‌سازی Background Jobهای زمان‌بندی‌شده و Notificationهای خودکار با Hangfire",
      "دریافت و بررسی نسخه اولیه سرویس Python Analytics، اعمال تغییرات موردنیاز و اتصال آن به Backend",
      "پیاده‌سازی Integration بین Backend، Frontend و Analytics Service و رفع مشکلات مربوط به ارتباط بین سرویس‌ها",
      "بررسی و تست APIها با Swagger و Postman و انجام Debugging و رفع خطاهای Backend",
      "همکاری تیمی در GitHub، توسعه ماژول‌به‌ماژول، استفاده از Branch و Merge و مدیریت GitHub Issues",
    ],

    keyDecisions: [
      "استفاده از Clean Architecture برای جداسازی Domain، منطق Application، Infrastructure و Web API و کاهش وابستگی بین بخش‌های مختلف سیستم.",
      "استفاده از CQRS و MediatR برای جداسازی عملیات خواندن و نوشتن و سازمان‌دهی Use Caseهای متعدد پروژه به شکل مستقل و قابل نگهداری.",
      "استفاده از IApplicationDbContext به‌جای Repository Pattern در Persistence؛ این تصمیم با ساختار CQRS پروژه هماهنگ است و اجازه می‌دهد Queryهای موردنیاز در Application مستقیماً بر پایه abstraction مربوط به DbContext نوشته شوند.",
      "استفاده از Rich Domain Model و Factory Method برای نگهداری بخشی از قواعد و منطق کسب‌وکار در Domain و جلوگیری از پخش‌شدن این منطق در لایه‌های دیگر.",
      "استفاده از Optimistic Concurrency با RowVersion برای تشخیص تغییرات هم‌زمان روی داده‌ها بدون نیاز به قفل‌گذاری گسترده.",
      "جدا کردن Analytics به‌عنوان یک سرویس مستقل Python/FastAPI و قرار دادن Backend به‌عنوان Gateway؛ در نتیجه Frontend مستقیماً به سرویس Analytics وابسته نیست.",
      "استفاده از Typed HttpClient، Internal API Key، Correlation ID و مدیریت Timeout و خطاهای ارتباطی برای کنترل ارتباط بین Backend و Analytics Service.",
    ],

    challenges: [
      {
        challenge:
          "یکپارچه‌سازی Backend، Frontend و سرویس مستقل Python که با تکنولوژی‌ها و چرخه توسعه متفاوت پیاده‌سازی شده بودند.",
        solution:
          "Backend به‌عنوان Gateway بین Frontend و Analytics قرار گرفت و قرارداد مشخصی برای ارتباط بین سرویس‌ها ایجاد شد. ارتباط Backend و Python Analytics با Typed HttpClient، Internal API Key، Correlation ID و مدیریت Timeout و خطا انجام شد تا هر بخش بتواند مستقل توسعه داده شود.",
      },
      {
        challenge:
          "مدیریت یک پروژه تیمی با تعداد زیادی ماژول و قابلیت که هم‌زمان توسط اعضای مختلف توسعه داده می‌شد.",
        solution:
          "Featureهای پروژه به‌صورت ماژولار سازمان‌دهی شدند و هر قابلیت ساختار Command/Query/Handler مشخص خود را داشت. همچنین GitHub Issues، Branchها، Mergeها و Commitهای تفکیک‌شده برای مدیریت فرآیند توسعه و کاهش تداخل استفاده شدند.",
      },
      {
        challenge:
          "پیاده‌سازی منطق پیشرفت Goals برای اهداف مختلف که می‌توانند بر اساس داده‌های متفاوتی مانند GPA، زمان مطالعه یا فعالیت‌های آموزشی محاسبه شوند.",
        solution:
          "برای محاسبه Progress، منطق محاسبه مقدار فعلی هدف از نمایش Progress جدا شد. برای هر نوع هدف، مقدار Current Value از منبع داده مناسب محاسبه می‌شود و سپس با Target Value برای محاسبه میزان پیشرفت استفاده می‌شود.",
      },
      {
        challenge:
          "حفظ یکپارچگی و قابلیت توسعه Backend با وجود تعداد زیادی عملیات و ماژول مختلف.",
        solution:
          "با استفاده از Clean Architecture، CQRS، ساختار Feature-based و جداسازی منطق Domain از جزئیات Infrastructure، هر ماژول تا حد امکان مستقل نگهداری شد و توسعه قابلیت‌های جدید بدون وابستگی شدید به بخش‌های دیگر انجام گرفت.",
      },
    ],
  },

  {
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    year: 1405,
    role: "Full-Stack Developer / Portfolio Website",
    category: "fullstack",

    shortDescription: {
      fa: "پورتفولیوی شخصی Full-Stack با Next.js و ASP.NET Core که شامل Case Study پروژه‌ها، Technical Blog، فرم تماس واقعی، دو زبان و SEO است.",
      en: "A full-stack personal portfolio built with Next.js and ASP.NET Core, featuring project case studies, a technical blog, real contact form, bilingual support, and SEO.",
    },

    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "ASP.NET Core Minimal API",
      "Entity Framework Core",
      "SQLite",
      "MDX",
      "Docker",
      "GitHub Actions",
      "Vercel",
      "Render",
    ],

    featured: true,

    githubUrl: "https://github.com/raha7rady/portfolio",

    metrics: [
      {
        label: {
          fa: "ساختار پروژه",
          en: "Architecture",
        },
        value: "Frontend + Backend",
      },
      {
        label: {
          fa: "رابط کاربری",
          en: "UI",
        },
        value: "Responsive",
      },
      {
        label: {
          fa: "پشتیبانی زبان",
          en: "Languages",
        },
        value: "FA / EN",
      },
      {
        label: {
          fa: "استقرار",
          en: "Deployment",
        },
        value: "Vercel + Render",
      },
    ],

    problem:
      "هدف پروژه ساخت یک Portfolio واقعی و قابل توسعه برای معرفی مسیر حرفه‌ای، مهارت‌ها و پروژه‌های توسعه‌یافته بود؛ نه صرفاً یک صفحه استاتیک که نام تکنولوژی‌ها را نمایش دهد. به همین دلیل Portfolio به‌صورت Full-Stack طراحی شد و علاوه بر رابط کاربری، Backend اختصاصی، دیتابیس، فرم تماس واقعی، Case Study پروژه‌ها، Technical Blog، قابلیت چندزبانه و امکانات SEO را در خود دارد.",

    architecture:
      "پروژه از دو سرویس مستقل تشکیل شده است: یک Frontend مبتنی بر Next.js و یک Backend اختصاصی مبتنی بر ASP.NET Core Minimal API. Frontend مسئول رابط کاربری، صفحات Portfolio، Case Studyها، Blog، Internationalization، Theme و ارتباط با API است و Backend مسئول APIهای موردنیاز و Persistence اطلاعات است. ارتباط بین دو بخش از طریق API انجام می‌شود و اطلاعات فرم تماس در SQLite با Entity Framework Core ذخیره می‌شود. این ساختار باعث شده مسئولیت‌های Frontend و Backend از یکدیگر جدا باشند و هر بخش بتواند مستقل توسعه و Deployment شود.",

    architectureLayers: [
      {
        layer: "Next.js Frontend",
        description:
          "مسئول نمایش Portfolio، پروژه‌ها، Case Studyها، Technical Blog، رابط کاربری، دو زبان، RTL/LTR، Dark/Light Mode و ارتباط با Backend است.",
        tech: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Framer Motion",
          "MDX",
        ],
      },
      {
        layer: "ASP.NET Core Backend",
        description:
          "یک Backend مستقل با Minimal API که Endpointهای موردنیاز سایت را ارائه می‌کند و مسئول پردازش درخواست‌های Contact و ارتباط با دیتابیس است.",
        tech: [
          "ASP.NET Core Minimal API",
          "Entity Framework Core",
          "SQLite",
          "REST API",
        ],
      },
      {
        layer: "Deployment & CI/CD",
        description:
          "Frontend و Backend به‌صورت مستقل آماده Deployment شده‌اند و فرآیند Build و Deployment با Pipelineهای GitHub Actions مدیریت می‌شود.",
        tech: [
          "Docker",
          "GitHub Actions",
          "Vercel",
          "Render",
          "CI/CD",
        ],
      },
    ],

    myRole: [
      "طراحی و توسعه پروژه Full-Stack برای معرفی حرفه‌ای مهارت‌ها و پروژه‌ها",
      "طراحی و توسعه Frontend با Next.js، React و TypeScript",
      "طراحی رابط کاربری با Tailwind CSS و پیاده‌سازی انیمیشن‌ها و تعاملات با Framer Motion",
      "طراحی و توسعه Backend مستقل با ASP.NET Core Minimal API",
      "طراحی APIهای موردنیاز برای ارتباط بین Frontend و Backend",
      "پیاده‌سازی Persistence با Entity Framework Core و SQLite",
      "طراحی و پیاده‌سازی فرم تماس واقعی و ذخیره پیام‌ها در Backend و Database",
      "پیاده‌سازی Case Study برای نمایش مسئله، معماری، نقش، تصمیمات فنی، چالش‌ها و راه‌حل‌های پروژه‌ها",
      "پیاده‌سازی Technical Blog مبتنی بر MDX و Syntax Highlighting",
      "پیاده‌سازی پشتیبانی فارسی و انگلیسی و مدیریت RTL/LTR",
      "پیاده‌سازی Dark Mode و Light Mode و ذخیره ترجیح کاربر",
      "پیاده‌سازی Responsive Design برای دستگاه‌های مختلف",
      "پیاده‌سازی SEO، Metadata اختصاصی و Dynamic Sitemap",
      "آماده‌سازی Deployment با Docker، Vercel و Render و ایجاد Pipelineهای CI با GitHub Actions",
    ],

    keyDecisions: [
      "جدا کردن Frontend و Backend به‌عنوان دو سرویس مستقل تا Portfolio علاوه بر یک رابط کاربری، یک Backend واقعی و قابل توسعه نیز داشته باشد.",
      "استفاده از ASP.NET Core Minimal API برای Backend به دلیل حجم و دامنه محدود APIهای موردنیاز Portfolio و حفظ سادگی ساختار Backend.",
      "استفاده از SQLite برای Persistence اطلاعات Contact به دلیل نیاز پروژه به یک دیتابیس سبک و متناسب با حجم داده Portfolio.",
      "استفاده از MDX برای Technical Blog تا محتوای فنی، کد و Syntax Highlighting به‌صورت مناسب در کنار ساختار Next.js مدیریت شود.",
      "طراحی سیستم Case Study به‌جای نمایش صرفاً نام پروژه و تکنولوژی‌ها، تا تصمیمات معماری، نقش توسعه‌دهنده و چالش‌های واقعی هر پروژه نیز قابل ارائه باشد.",
      "استفاده از GitHub Actions برای جدا کردن فرآیندهای Build و Deployment و ایجاد یک جریان مشخص برای استقرار Frontend و Backend.",
    ],

    challenges: [
      {
        challenge:
          "ساخت یک Portfolio که هم از نظر ظاهری مدرن باشد و هم نمونه‌ای واقعی از توسعه Full-Stack محسوب شود.",
        solution:
          "پروژه به دو سرویس مستقل Frontend و Backend تقسیم شد و علاوه بر صفحات معرفی، قابلیت‌هایی مانند Contact Form، Database Persistence، Blog، Case Study، Internationalization و SEO به آن اضافه شد.",
      },
      {
        challenge:
          "هماهنگ‌سازی Frontend و Backend برای فرم تماس و مدیریت صحیح اطلاعات ارسالی.",
        solution:
          "یک API اختصاصی برای Contact طراحی شد و داده‌های دریافت‌شده توسط Backend پردازش و با Entity Framework Core در SQLite ذخیره شدند. ارتباط Frontend و Backend نیز از طریق API انجام می‌شود.",
      },
      {
        challenge:
          "پشتیبانی هم‌زمان از فارسی و انگلیسی و تفاوت جهت نمایش محتوا در RTL و LTR.",
        solution:
          "ساختار رابط کاربری به‌گونه‌ای طراحی شد که زبان و جهت صفحه به‌صورت هماهنگ تغییر کند و اجزای مختلف سایت برای هر دو حالت RTL و LTR قابل استفاده باشند.",
      },
      {
        challenge:
          "آماده‌سازی پروژه برای Deployment و مدیریت مستقل Frontend و Backend.",
        solution:
          "Frontend روی Vercel و Backend روی Render قرار گرفت و Docker و GitHub Actions برای آماده‌سازی و خودکارسازی فرآیند Build و Deployment استفاده شدند.",
      },
    ],
  },

  {
    slug: "supermarket",
    title: "SuperMarket — ASP.NET Core MVC E-Commerce",
    year: 1404,
    role: "Independent Developer",
    category: "backend",

    shortDescription: {
      fa: "فروشگاه اینترنتی مبتنی بر ASP.NET Core MVC و .NET 8 که از صفر با Clean/Onion Architecture، Identity و مدیریت هم‌زمانی موجودی توسعه داده شده است.",
      en: "An ASP.NET Core MVC e-commerce application built from scratch with Clean/Onion Architecture, Identity, and inventory concurrency control.",
    },

    techStack: [
      "C# / .NET 8",
      "ASP.NET Core MVC",
      "Razor Views",
      "Entity Framework Core",
      "SQL Server",
      "ASP.NET Core Identity",
      "FluentValidation",
      "AutoMapper",
      "Clean Architecture",
      "Onion Architecture",
      "Repository Pattern",
      "Unit of Work",
      "Service Layer",
      "DDD Concepts",
      "Value Objects",
      "Git / GitHub",
    ],

    featured: false,

    githubUrl: "https://github.com/raha7rady/SuperMarket",

    metrics: [
      {
        label: {
          fa: "معماری",
          en: "Architecture",
        },
        value: "Clean / Onion",
      },
      {
        label: {
          fa: "لایه‌ها",
          en: "Layers",
        },
        value: "4 Layers",
      },
      {
        label: {
          fa: "احراز هویت",
          en: "Authentication",
        },
        value: "ASP.NET Identity",
      },
      {
        label: {
          fa: "مدیریت موجودی",
          en: "Inventory",
        },
        value: "Atomic Update",
      },
    ],

    problem:
      "این پروژه به‌عنوان اولین پروژه ASP.NET که به‌صورت مستقل و از صفر توسعه داده شد، با هدف ساخت یک نمونه نسبتاً واقعی از یک سیستم E-Commerce ایجاد شد. هدف فقط پیاده‌سازی CRUD نبود؛ بلکه پروژه باید مفاهیمی مانند طراحی Domain، معماری چندلایه، طراحی دیتابیس، Authentication، مدیریت سفارش، Checkout، موجودی، پرداخت و چالش‌های هم‌زمانی را در یک سیستم یکپارچه پوشش می‌داد.",

    architecture:
      "پروژه بر پایه Clean Architecture / Onion Architecture در چهار لایه Domain، Application، Infrastructure و Web طراحی شده است. توسعه به‌صورت مرحله‌ای انجام شد و ابتدا Domain و Database طراحی شدند، سپس Application و Infrastructure و در نهایت Web Layer توسعه داده شد. برخلاف StudentInsights، در این پروژه از Repository Pattern، Unit of Work و Service Layer استفاده شده است. این تفاوت به دلیل ساختار پروژه است؛ SuperMarket از CQRS استفاده نمی‌کند و Repository و Service Layer در این معماری برای جداسازی عملیات Persistence و منطق Application مورد استفاده قرار گرفته‌اند.",

    architectureLayers: [
      {
        layer: "Domain Layer",
        description:
          "شامل Entityهای اصلی، Value Objectها و قواعد کسب‌وکار سیستم است و منطق اصلی Domain تا حد امکان از جزئیات Persistence و Web جدا نگه داشته شده است.",
        tech: [
          "C#",
          "Entities",
          "Value Objects",
          "Domain Rules",
          "DDD Concepts",
        ],
      },
      {
        layer: "Application Layer",
        description:
          "منطق Application و Service Layer، DTOها، ViewModelها و Validationهای موردنیاز سیستم در این لایه سازمان‌دهی شده‌اند.",
        tech: [
          "Service Layer",
          "DTOs",
          "ViewModels",
          "FluentValidation",
          "AutoMapper",
        ],
      },
      {
        layer: "Infrastructure Layer",
        description:
          "پیاده‌سازی Persistence با EF Core، Repositoryها، Unit of Work، Identity و عملیات مرتبط با SQL Server در این لایه قرار دارد.",
        tech: [
          "Entity Framework Core",
          "SQL Server",
          "Repository Pattern",
          "Unit of Work",
          "ASP.NET Core Identity",
        ],
      },
      {
        layer: "Web Layer",
        description:
          "لایه ارائه‌دهنده سیستم که شامل MVC Controllers، Razor Views، Model Binding، Routing، Cookie Authentication و بخش‌های Customer و Admin است.",
        tech: [
          "ASP.NET Core MVC",
          "Razor Views",
          "Controllers",
          "Cookie Authentication",
          "PRG Pattern",
        ],
      },
    ],

    myRole: [
      "طراحی و توسعه مستقل پروژه از تحلیل نیازمندی‌ها تا پیاده‌سازی و Debugging",
      "انتخاب و پیاده‌سازی Clean/Onion Architecture در چهار لایه",
      "طراحی Domain Model و دیتابیس SQL Server با Code First و EF Core Migrations",
      "طراحی Entityها و روابط One-to-One، One-to-Many و Many-to-Many",
      "پیاده‌سازی Repository Pattern، Unit of Work و Service Layer",
      "پیاده‌سازی Authentication و Authorization با ASP.NET Core Identity",
      "پیاده‌سازی نقش‌های Customer، Admin، Staff و SuperAdmin و مدیریت دسترسی‌ها",
      "پیاده‌سازی Product، Category، Cart، Checkout، Order و Inventory Management",
      "پیاده‌سازی Search، Filtering و Pagination برای محصولات",
      "پیاده‌سازی Coupon، Shipping Cost و اطلاعات گیرنده و آدرس ارسال",
      "طراحی Payment Module و State Machine برای مدیریت وضعیت Payment",
      "پیاده‌سازی Atomic Inventory Update و مدیریت Concurrency در فرآیند Checkout",
      "توسعه Customer و Admin Sections با ASP.NET Core MVC و Razor Views",
      "انجام Debugging و رفع تدریجی مشکلات در طول توسعه پروژه",
    ],

    keyDecisions: [
      "استفاده از Clean/Onion Architecture برای جداسازی Domain، Application، Infrastructure و Web و ایجاد ساختاری قابل توسعه برای یک پروژه E-Commerce.",
      "استفاده از Repository Pattern و Unit of Work در این پروژه، برخلاف StudentInsights که به دلیل استفاده از CQRS و IApplicationDbContext از Repository Pattern استفاده نمی‌کند.",
      "استفاده از ASP.NET Core Identity برای مدیریت Authentication، Password و Role-based Authorization به‌جای پیاده‌سازی کامل سیستم احراز هویت از ابتدا.",
      "استفاده از ExecuteUpdateAsync برای کاهش اتمیک موجودی به‌جای Read-Then-Write، تا عملیات کاهش موجودی در سطح Database به‌صورت ایمن‌تر انجام شود.",
      "استفاده از UPDLOCK در بخش‌هایی از فرآیند Checkout که نیاز به کنترل رکورد در طول Transaction وجود دارد.",
      "پیاده‌سازی Payment به‌صورت State Machine داخلی و مستقل از درگاه بانکی؛ در نسخه فعلی پروژه اتصال به درگاه واقعی انجام نشده است.",
      "استفاده از Value Objectها و برخی مفاهیم DDD برای مدل‌سازی بهتر داده‌ها و نگهداری قواعد مرتبط با Domain.",
    ],

    challenges: [
      {
        challenge:
          "مدیریت هم‌زمانی هنگام کاهش موجودی یک محصول؛ زمانی که چند درخواست Checkout به‌صورت هم‌زمان برای یک محصول ارسال می‌شوند.",
        solution:
          "کاهش موجودی با ExecuteUpdateAsync و شرط کافی‌بودن موجودی به‌صورت اتمیک انجام شد. همچنین در بخش‌هایی از Checkout که نیاز به کنترل رکورد در طول Transaction وجود داشت، از UPDLOCK استفاده شد تا احتمال Race Condition و فروش بیش از موجودی کاهش پیدا کند.",
      },
      {
        challenge:
          "طراحی و پیاده‌سازی یک سیستم E-Commerce نسبتاً کامل به‌صورت مستقل و از صفر.",
        solution:
          "ابتدا نیازمندی‌های اصلی مشخص شدند و سپس معماری و Domain Model انتخاب شد. توسعه به‌صورت مرحله‌ای از Domain و Database به سمت Application، Infrastructure و در نهایت Web انجام گرفت تا پیچیدگی پروژه به بخش‌های کوچک‌تر تقسیم شود.",
      },
      {
        challenge:
          "مدیریت وضعیت‌های مختلف Payment و جلوگیری از پخش‌شدن منطق پرداخت در بخش‌های مختلف سیستم.",
        solution:
          "یک Payment Module مستقل طراحی شد و وضعیت پرداخت در قالب State Machine شامل Pending، Processing، Paid، Failed، Refunded و Canceled مدیریت شد. اتصال به درگاه بانکی واقعی به نسخه فعلی پروژه وارد نشده و Payment در سطح مدیریت داخلی پیاده‌سازی شده است.",
      },
    ],
  },

  {
    slug: "student-management-system",
    title: "Student Management System",
    year: 1403,
    role: "C# / Windows Forms Developer",
    category: "backend",

    shortDescription: {
      fa: "نرم‌افزار دسکتاپ چندنقشی برای مدیریت یک سامانه دانشجویی با C# و Windows Forms و پایگاه‌داده MySQL.",
      en: "A multi-role student management desktop application built with C# and Windows Forms using MySQL.",
    },

    techStack: [
      "C#",
      "Windows Forms",
      "MySQL",
      "SQL",
      "OOP",
      "CRUD",
      "Role-based Access",
    ],

    featured: false,

    githubUrl: "https://github.com/raha7rady/UniversityManagement",

   images: [
      "/images/projects/student-management-system/Screenshot%202026-08-27%20175734%20(1).webp",
      "/images/projects/student-management-system/Screenshot%202026-08-27%20175734%20(2).webp",
      "/images/projects/student-management-system/Screenshot%202026-08-27%20175734%20(3).webp",
      "/images/projects/student-management-system/Screenshot%202026-08-27%20175734%20(4).webp",
      "/images/projects/student-management-system/Screenshot%202026-08-27%20175734%20(5).webp",
      "/images/projects/student-management-system/Screenshot%202026-08-27%20175734%20(6).webp",
      "/images/projects/student-management-system/Screenshot%202026-08-27%20175734%20(7).webp",
      "/images/projects/student-management-system/Screenshot%202026-08-27%20175734%20(8).webp",
      "/images/projects/student-management-system/Screenshot%202026-08-27%20175734%20(9).webp",
      "/images/projects/student-management-system/Screenshot%202026-08-27%20175734%20(10).webp",
    ],

    metrics: [
      {
        label: {
          fa: "نقش‌های کاربری",
          en: "User Roles",
        },
        value: "3 Roles",
      },
      {
        label: {
          fa: "پایگاه داده",
          en: "Database",
        },
        value: "MySQL",
      },
      {
        label: {
          fa: "نوع برنامه",
          en: "Application",
        },
        value: "Desktop",
      },
      {
        label: {
          fa: "عملیات داده",
          en: "Data Operations",
        },
        value: "CRUD",
      },
    ],

    problem:
      "هدف پروژه ساخت یک نرم‌افزار دسکتاپ برای مدیریت اطلاعات یک سامانه دانشجویی و تجربه عملی در طراحی یک برنامه Database-driven بود. سیستم باید چند نقش متفاوت داشته باشد و هر نقش بتواند بر اساس سطح دسترسی خود به بخش‌های مرتبط دسترسی پیدا کند. این پروژه در مسیر یادگیری C# تجربه عملی در کار با Windows Forms، MySQL، SQL و منطق برنامه را فراهم کرد.",

    architecture:
      "برنامه با C# و Windows Forms توسعه داده شده و MySQL به‌عنوان پایگاه‌داده مورد استفاده قرار گرفته است. سیستم دارای سه نقش اصلی Student، Professor و Admin است و هر نقش به قابلیت‌ها و بخش‌های متناسب با مسئولیت خود دسترسی دارد. ساختار برنامه شامل فرم‌های مختلف برای عملیات کاربر و مدیریت اطلاعات و همچنین منطق مربوط به ارتباط با دیتابیس و عملیات CRUD است.",

    architectureLayers: [
      {
        layer: "Desktop Application",
        description:
          "رابط کاربری و فرم‌های مختلف سیستم با Windows Forms پیاده‌سازی شده‌اند و وظیفه دریافت ورودی کاربر، نمایش اطلاعات و اجرای عملیات مرتبط را بر عهده دارند.",
        tech: [
          "C#",
          "Windows Forms",
          "Forms",
          "Input Validation",
        ],
      },
      {
        layer: "Application Logic",
        description:
          "منطق مربوط به کاربران، نقش‌ها، عملیات CRUD و مدیریت داده‌ها در این بخش پیاده‌سازی شده است.",
        tech: [
          "C#",
          "OOP",
          "Business Logic",
          "Role-based Access",
        ],
      },
      {
        layer: "Database",
        description:
          "اطلاعات سیستم در MySQL ذخیره می‌شود و برنامه از طریق عملیات SQL با داده‌های دانشجویان، استادان و سایر اطلاعات سیستم کار می‌کند.",
        tech: [
          "MySQL",
          "SQL",
          "Relational Database",
          "CRUD",
        ],
      },
    ],

    myRole: [
      "طراحی و پیاده‌سازی ساختار نرم‌افزار با C# و Windows Forms",
      "طراحی دیتابیس MySQL و ساختار داده‌های موردنیاز سیستم",
      "اتصال برنامه C# به MySQL",
      "پیاده‌سازی عملیات CRUD برای داده‌های سیستم",
      "پیاده‌سازی سیستم چندنقشی برای Student، Professor و Admin",
      "مدیریت دسترسی کاربران بر اساس Role",
      "طراحی فرم‌های مختلف Windows Forms",
      "پیاده‌سازی Validation برای اطلاعات ورودی",
      "پیاده‌سازی منطق مربوط به مدیریت اطلاعات دانشجویان و استادان",
      "کار با SQL و عملیات مختلف Database",
    ],

    keyDecisions: [
      "استفاده از مدل Role-based Access برای تفکیک دسترسی Student، Professor و Admin و جلوگیری از یکسان‌بودن قابلیت‌های همه کاربران.",
      "استفاده از MySQL به‌عنوان دیتابیس رابطه‌ای برای تجربه عملی در طراحی جداول، روابط و عملیات SQL.",
      "استفاده از Windows Forms برای ساخت رابط کاربری دسکتاپ و تمرکز بر تجربه عملی در ارتباط بین UI، منطق برنامه و Database.",
    ],

    challenges: [
      {
        challenge:
          "مدیریت دسترسی متفاوت برای سه نقش Student، Professor و Admin.",
        solution:
          "سطح دسترسی بر اساس Role کاربر مشخص شد و بخش‌ها و عملیات قابل دسترسی برای هر نقش از یکدیگر تفکیک شدند.",
      },
      {
        challenge:
          "ارتباط برنامه Windows Forms با MySQL و انجام صحیح عملیات روی داده‌ها.",
        solution:
          "ساختار دیتابیس و عملیات SQL مشخص شد و برنامه برای انجام عملیات CRUD و مدیریت اطلاعات سیستم به MySQL متصل شد.",
      },
      {
        challenge:
          "مدیریت اطلاعات و روابط مختلف در فرم‌های Windows Forms.",
        solution:
          "فرم‌های مختلف برای بخش‌های سیستم طراحی شدند و عملیات مربوط به دریافت، نمایش، ایجاد، ویرایش و حذف داده‌ها در آن‌ها پیاده‌سازی شد.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((project) => project.featured);
}