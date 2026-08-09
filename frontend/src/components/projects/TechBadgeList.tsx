import Badge from "@/components/ui/Badge";

export default function TechBadgeList({ techs }: { techs: string[] }) {
  if (techs.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {techs.map((tech) => (
        <li key={tech}>
          <Badge tone="accent">{tech}</Badge>
        </li>
      ))}
    </ul>
  );
}
