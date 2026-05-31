import Link from "next/link";

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 px-6 py-[15px] flex items-center justify-between border-b border-border bg-base">
      <Link
        href="/"
        className="font-mono text-[11px] tracking-[0.15em] uppercase text-primary hover:opacity-60 transition-opacity duration-300"
      >
        Timas Gudziunas
      </Link>

      <nav className="flex items-center gap-6">
        <Link
          href="/field-notes"
          className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted hover:text-primary transition-colors duration-300"
        >
          Field Notes
        </Link>
        <Link
          href="/projects"
          className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted hover:text-primary transition-colors duration-300"
        >
          Projects
        </Link>
      </nav>
    </header>
  );
}
