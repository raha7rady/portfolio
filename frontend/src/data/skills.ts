export type SkillLevel = "production" | "practiced" | "learning";

export type Skill = {
  name: string;
  level: SkillLevel;
};

export type SkillCategory = {
  title: string;
  skills: Skill[];
};

// فقط رنگ (Tone) هر سطح اینجاست — چون رنگ ترجمه نمی‌شود؛ برچسب متنی هر سطح
// از فرهنگ‌لغت i18n (dict.skills.levelProduction/levelPracticed/levelLearning) خوانده می‌شود.
export const SKILL_LEVEL_TONE: Record<SkillLevel, "success" | "accent" | "neutral"> = {
  production: "success",
  practiced: "accent",
  learning: "neutral",
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
