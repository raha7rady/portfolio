export type SkillLevel = "production" | "practiced" | "learning";

export type Skill = {
  name: string;
  level: SkillLevel;
};

export type SkillCategory = {
  title: string;
  skills: Skill[];
};

// برچسب و رنگ نمایشی هر سطح — یک‌بار تعریف، در همه‌جای UI استفاده می‌شود
export const SKILL_LEVEL_META: Record<
  SkillLevel,
  { label: string; tone: "success" | "accent" | "neutral" }
> = {
  production: { label: "استفاده در پروژه واقعی", tone: "success" },
  practiced: { label: "تمرین‌شده", tone: "accent" },
  learning: { label: "در حال یادگیری", tone: "neutral" },
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Backend & .NET",
    skills: [
      { name: "C#", level: "production" },
      { name: "ASP.NET Core / Web API", level: "production" },
      { name: "Entity Framework Core", level: "production" },
      { name: "CQRS / MediatR", level: "production" },
      { name: "Clean Architecture", level: "production" },
      { name: "REST API Design", level: "production" },
      { name: "Unit Testing", level: "practiced" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "SQL Server", level: "production" },
      { name: "Database Design", level: "production" },
      { name: "MySQL", level: "practiced" },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", level: "production" },
      { name: "JavaScript", level: "practiced" },
      { name: "HTML / CSS", level: "practiced" },
    ],
  },
  {
    title: "Tools & Collaboration",
    skills: [
      { name: "Git & GitHub", level: "production" },
      { name: "Postman", level: "production" },
      { name: "Docker", level: "learning" },
    ],
  },
];
