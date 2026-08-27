export type SkillLevel = "handsOn" | "workingKnowledge" | "learning";

export type Skill = {
  name: string;
  level: SkillLevel;
};

export type SkillCategory = {
  title: string;
  skills: Skill[];
};

export const SKILL_LEVEL_TONE: Record<
  SkillLevel,
  "success" | "accent" | "neutral"
> = {
  handsOn: "success",
  workingKnowledge: "accent",
  learning: "neutral",
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Backend & .NET",
    skills: [
      { name: "C#", level: "handsOn" },
      { name: "ASP.NET Core / Web API", level: "handsOn" },
      { name: "ASP.NET Core MVC", level: "handsOn" },
      { name: "Entity Framework Core", level: "handsOn" },
      { name: "LINQ", level: "handsOn" },
      { name: "REST API Development", level: "handsOn" },
      { name: "Dependency Injection", level: "workingKnowledge" },
      { name: "Clean Architecture", level: "workingKnowledge" },
      { name: "CQRS / MediatR", level: "workingKnowledge" },
      { name: "JWT Authentication", level: "workingKnowledge" },
      { name: "ASP.NET Core Identity", level: "workingKnowledge" },
      { name: "FluentValidation", level: "workingKnowledge" },
      { name: "Middleware", level: "workingKnowledge" },
      { name: "Unit / Integration Testing", level: "workingKnowledge" },
      { name: "Windows Forms", level: "handsOn" },
    ],
  },

  {
    title: "Database",
    skills: [
      { name: "SQL Server", level: "handsOn" },
      { name: "Database Design & Data Modeling", level: "handsOn" },
      { name: "Entity Relationships", level: "handsOn" },
      { name: "EF Core Migrations", level: "handsOn" },
      { name: "LINQ / IQueryable", level: "handsOn" },
      { name: "SQL Queries & CRUD", level: "handsOn" },
      { name: "MySQL", level: "handsOn" },
      { name: "SQLite", level: "learning" },
    ],
  },

  {
    title: "Frontend",
    skills: [
      { name: "React", level: "learning" },
      { name: "Next.js", level: "learning" },
      { name: "TypeScript", level: "learning" },
      { name: "HTML / CSS", level: "workingKnowledge" },
      { name: "Tailwind CSS", level: "learning" },
      { name: "REST API Integration", level: "handsOn" },
      { name: "Responsive Web Design", level: "workingKnowledge" },
      { name: "JavaScript", level: "learning" },
    ],
  },

  {
    title: "Tools & Development",
    skills: [
      { name: "Git & GitHub", level: "handsOn" },
      { name: "Postman", level: "handsOn" },
      { name: "Swagger / OpenAPI", level: "handsOn" },
      { name: "Python", level: "workingKnowledge" },
      { name: "FastAPI", level: "workingKnowledge" },
      { name: "Docker", level: "learning" },
      { name: "Deployment & Hosting", level: "learning" },
    ],
  },
];