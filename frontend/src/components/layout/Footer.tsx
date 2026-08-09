const SOCIAL_LINKS = [
  { href: "https://github.com/", label: "GitHub" },
  { href: "https://linkedin.com/", label: "LinkedIn" },
  { href: "mailto:example@example.com", label: "Email" },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="page-container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <p className="text-sm text-muted">© {year} مهتا. تمام حقوق محفوظ است.</p>

        <ul className="flex items-center gap-5">
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
