import Link from "next/link";

export default function SiteNav() {
  return (
    <header className="px-6 py-5 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
      <Link
        href="/"
        className="text-sm font-semibold tracking-tight hover:opacity-60 transition-opacity"
      >
        Timas Gudziunas
      </Link>
      <nav className="flex gap-6 text-sm text-neutral-500 dark:text-neutral-400">
        <Link href="/field-notes" className="hover:text-foreground transition-colors">
          Field Notes
        </Link>
        <Link href="/projects" className="hover:text-foreground transition-colors">
          Projects
        </Link>
      </nav>
    </header>
  );
}
