import type { Metadata } from "next";
import Link from "next/link";
import { getFieldNoteSlugs } from "@/lib/get-field-notes";

const description =
  "Thoughts, research, reflections, and lessons documented in real time.";

export const metadata: Metadata = {
  title: "Field Notes",
  description,
  openGraph: {
    title: "Field Notes | Timas Gudziunas",
    description,
    url: "/field-notes",
    type: "website",
  },
  twitter: {
    title: "Field Notes | Timas Gudziunas",
    description,
  },
};

// NOTE: while src/content/field-notes/ has zero .mdx files, Turbopack cannot
// compile a dynamic `import("@/content/field-notes/...mdx")` — so this index
// lists slugs only. When the first real note lands, restore the metadata
// import (title/date sorted) — see git history of this file.
export default function NotesIndexPage() {
  const slugs = getFieldNoteSlugs();

  return (
    <main>
      <h1>Field Notes</h1>
      <p>{description}</p>

      {slugs.length === 0 ? (
        <p>Nothing published yet. Check back soon.</p>
      ) : (
        <ul>
          {slugs.map((slug) => (
            <li key={slug}>
              <Link href={`/field-notes/${slug}`}>{slug}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
