export type ProjectChallenge = {
  challenge: string;
  solution: string;
};

export type LocalizedText = {
  fa: string;
  en: string;
};

export type Project = {
  slug: string;
  title: string;
  // فقط توضیح کوتاه دو زبانه است (چون کوتاه و کم‌هزینه برای ترجمه است)؛
  // بدنه کامل Case Study (problem/architecture/...) طبق تصمیم فاز ۶ فعلاً فقط فارسی است.
  shortDescription: LocalizedText;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  problem: string;
  architecture: string;
  myRole: string[];
  keyDecisions: string[];
  challenges: ProjectChallenge[];
};

export const PROJECTS: Project[] = [
  {
    slug: "student-insights",
    title: "StudentInsights",
    shortDescription: {
      fa: "سامانه مدیریت و تحلیل فعالیت‌های آموزشی دانشجویی — توسعه‌یافته به‌صورت تیمی با Clean Architecture و CQRS.",
      en: "A student academic activity management and analytics platform — built as a team project with Clean Architecture and CQRS.",
    },
    techStack: [
      "ASP.NET Core Web API",
      "Clean Architecture",
      "CQRS / MediatR",
      "Entity Framework Core",
      "SQL Server",
      "React",
      "Python (Analytics Service)",
      "JWT Auth",
      "Git / GitHub",
    ],
    featured: true,
    // githubUrl و liveUrl عمداً خالی مانده — طبق «نکات باز» فاز ۱، بعد از آماده‌شدن ریپوی عمومی پروژه تکمیل می‌شود.

    problem:
      "دانشجویان معمولاً فعالیت‌های آموزشی‌شان (دروس، امتحانات، اهداف درسی، جلسات مطالعه، رویدادهای شخصی) را در ابزارهای پراکنده و غیرمرتبط به هم مدیریت می‌کنند و هیچ دید یکپارچه‌ای از پیشرفت تحصیلی خود ندارند. StudentInsights یک پلتفرم واحد است که این فعالیت‌ها را در کنار هم ثبت، پیگیری و تحلیل می‌کند تا دانشجو بتواند پیشرفت واقعی خودش را ببیند — نه فقط لیستی از تسک‌ها.",

    architecture:
      "بک‌اند بر پایه Clean Architecture در چهار لایه طراحی شده: Domain (موجودیت‌ها و قواعد کسب‌وکار مستقل از فریم‌ورک)، Application (منطق برنامه با الگوی CQRS و MediatR — هر Command/Query یک Handler مجزا دارد)، Infrastructure (پیاده‌سازی دسترسی به داده با EF Core و SQL Server، و سرویس‌های خارجی) و WebAPI (کنترلرها و تنظیمات ورودی/خروجی). این جداسازی باعث شده منطق دامنه کاملاً مستقل از جزئیات پایگاه‌داده یا فریم‌ورک وب باقی بماند. فرانت‌اند React از طریق REST API با بک‌اند ارتباط برقرار می‌کند، و یک سرویس مجزای Python مسئول تحلیل داده‌های آماری (مثل روند پیشرفت و الگوهای مطالعه) است که خروجی‌اش به بک‌اند اصلی متصل می‌شود.",

    myRole: [
      "توسعه بخش اصلی Backend با ASP.NET Core Web API",
      "طراحی و پیاده‌سازی معماری پروژه بر پایه Clean Architecture و CQRS",
      "طراحی و پیاده‌سازی ساختار پایگاه‌داده",
      "پیاده‌سازی بیشتر ماژول‌ها و APIهای موردنیاز سیستم (Auth، Courses، Exams، LearningActivities، Goals، StudyLogs، Notifications، Dashboard، Analytics، Calendar)",
      "دریافت نسخه اولیه سرویس Analytics مبتنی بر Python، توسعه و بهبود آن و اتصالش به Backend",
      "اتصال Frontend مبتنی بر React به Backend و انجام تست‌های Integration",
      "شناسایی و رفع باگ‌های Frontend و اعمال تغییرات موردنیاز در پروژه React",
      "مدیریت مخزن Git/GitHub، تعریف Issue، و هماهنگی مراحل توسعه با اعضای تیم",
    ],

    keyDecisions: [
      "استفاده از CQRS با MediatR به‌جای یک Service Layer ساده، برای جداسازی واضح مسیر Read (Query) از مسیر Write (Command) — مخصوصاً چون بخش Analytics و Dashboard حجم بالایی از Queryهای پیچیده دارند که نباید با منطق نوشتن قاطی شوند.",
      "پیاده‌سازی Authentication سفارشی (User Aggregate + JWT با Refresh Token) به‌جای ASP.NET Identity، برای کنترل کامل روی مدل دامنه کاربر و امکان توسعه ساده‌تر قابلیت‌هایی مثل ایمیل تأییدیه بدون محدودیت‌های یک کتابخانه آماده.",
      "استفاده از Optimistic Concurrency (RowVersion) به‌جای قفل‌گذاری صریح روی رکوردهایی مثل اهداف و امتحانات، چون تداخل هم‌زمان کم است ولی وقتی رخ می‌دهد باید تشخیص داده شود بدون قربانی‌کردن Performance.",
      "جداسازی سرویس Analytics در Python به‌جای نوشتن منطق تحلیل آماری در C#، چون اکوسیستم Python برای این نوع محاسبات (و توسعه بعدی احتمالی به سمت یادگیری ماشین) ابزار غنی‌تری دارد.",
    ],

    challenges: [
      {
        challenge:
          "محاسبه پیشرفت اهداف (Goals) برای انواع مختلف هدف (مثلاً هدف GPA در برابر هدف تعداد ساعت مطالعه) که هرکدام منبع داده متفاوتی دارند.",
        solution:
          "به‌جای منطق جداگانه برای هر نوع هدف، مدل Goal با یک فیلد عمومی CurrentValue در کنار TargetValue گسترش داده شد تا پیشرفت به‌صورت یکسان محاسبه شود؛ برای مواردی مثل GPA که داده اختصاصی دارند (میانگین وزنی نمرات بر اساس واحد درسی)، مقدار از قبل محاسبه و در همان فیلد عمومی به‌روزرسانی می‌شود — یعنی منطق نمایش پیشرفت برای همه انواع هدف یکسان می‌ماند.",
      },
      {
        challenge:
          "یکپارچه‌سازی سه بخش مستقل (Backend در ASP.NET Core، Frontend در React، و سرویس Analytics در Python) که هرکدام چرخه توسعه و زبان جداگانه داشتند.",
        solution:
          "برای هر بخش قرارداد API واضح تعریف شد (مستندسازی endpointها با Swagger برای Backend) و سرویس Analytics به‌عنوان یک مصرف‌کننده/تأمین‌کننده داده مجزا از طریق HTTP به Backend اصلی وصل شد؛ این یعنی هر سه بخش می‌توانستند مستقل توسعه داده شوند و فقط در نقاط اتصال (Contract) هماهنگ باشند.",
      },
      {
        challenge:
          "مدیریت هم‌زمان توسعه چند ماژول (Auth، Courses، Exams، Goals، ...) توسط چند نفر بدون تداخل کد.",
        solution:
          "پروژه به‌صورت ماژولار در لایه Application سازمان‌دهی شد (هر ماژول پوشه Command/Query/Handler مستقل خودش را دارد)، و توسعه از طریق GitHub Issues برای هر قابلیت، Branch جداگانه، و Commitهای مرحله‌ای مدیریت شد تا تداخل کد به حداقل برسد.",
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
