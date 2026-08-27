import type { Metadata } from "next";
import Link from "next/link";
import { getArticleSlugs } from "@/lib/get-articles";

const description =
  "Thoughts, research, reflections, and lessons documented in real time.";

export const metadata: Metadata = {
  title: "Articles",
  description,
  openGraph: {
    title: "Articles | Timas Gudziunas",
    description,
    url: "/articles",
    type: "website",
  },
  twitter: {
    title: "Articles | Timas Gudziunas",
    description,
  },
};

// NOTE: while src/content/articles/ has zero .mdx files, Turbopack cannot
// compile a dynamic `import("@/content/articles/...mdx")` — so this index
// lists slugs only. When the first real article lands, restore the metadata
// import (title/date sorted) — see git history of this file.
export default function ArticlesIndexPage() {
  const slugs = getArticleSlugs();

  return (
    <main>
      <h1>Articles</h1>
      <p>{description}</p>

      {slugs.length === 0 ? (
        <p>Nothing published yet. Check back soon.</p>
      ) : (
        <ul>
          {slugs.map((slug) => (
            <li key={slug}>
              <Link href={`/articles/${slug}`}>{slug}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
