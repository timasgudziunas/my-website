import type { Metadata } from "next";
import Link from "next/link";
import { getProjectSlugs } from "@/lib/get-projects";

const description = "Things I'm building — tracked in public.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  openGraph: {
    title: "Projects — Timas Gudziunas",
    description,
    url: "/projects",
    type: "website",
  },
  twitter: {
    title: "Projects — Timas Gudziunas",
    description,
  },
};

// NOTE: while src/content/projects/ has zero .mdx files, Turbopack cannot
// compile a dynamic `import("@/content/projects/...mdx")` — so this index
// lists slugs only. When the first real project lands, restore the metadata
// import (title/summary, date sorted) — see git history of this file.
export default function ProjectsIndexPage() {
  const slugs = getProjectSlugs();

  return (
    <main>
      <h1>Projects</h1>
      <p>{description}</p>

      {slugs.length === 0 ? (
        <p>Nothing here yet. Check back soon.</p>
      ) : (
        <ul>
          {slugs.map((slug) => (
            <li key={slug}>
              <Link href={`/projects/${slug}`}>{slug}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
