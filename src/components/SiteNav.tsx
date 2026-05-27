import Link from "next/link";

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 px-6 py-[15px] flex items-center justify-between border-b border-border bg-background">
      <Link
        href="/"
        className="font-serif text-base hover:opacity-60 transition-opacity"
      >
        Timas Gudziunas
      </Link>

      <nav className="flex gap-6 text-sm text-muted">
        <Link
          href="/field-notes"
          className="hover:text-foreground transition-colors"
        >
          Field Notes
        </Link>
        <Link
          href="/projects"
          className="hover:text-foreground transition-colors"
        >
          Projects
        </Link>
      </nav>
    </header>
  );
}
