import type { Metadata } from "next";
import Link from "next/link";
import { getFieldNoteSlugs, type FieldNoteMetadata } from "@/lib/get-field-notes";

const description = "Writing about what I'm learning, building, and thinking about.";

export const metadata: Metadata = {
  title: "Field Notes",
  description,
  openGraph: {
    title: "Field Notes — Timas Gudziunas",
    description,
    url: "/field-notes",
    type: "website",
  },
  twitter: {
    title: "Field Notes — Timas Gudziunas",
    description,
  },
};

type NoteItem = { slug: string; metadata: FieldNoteMetadata };

export default async function NotesIndexPage() {
  const slugs = getFieldNoteSlugs();

  const notes: NoteItem[] = await Promise.all(
    slugs.map(async (slug) => {
      const mod = (await import(`@/content/field-notes/${slug}.mdx`)) as {
        metadata: FieldNoteMetadata;
      };
      return { slug, metadata: mod.metadata };
    })
  );

  notes.sort(
    (a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">Field Notes</h1>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Writing about what I&apos;m learning, building, and thinking about.
        </p>
      </header>

      {notes.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">
          Nothing here yet. Check back soon.
        </p>
      ) : (
        <ul className="space-y-8">
          {notes.map(({ slug, metadata: noteMeta }) => (
            <li key={slug}>
              <Link href={`/field-notes/${slug}`} className="group block">
                <p className="text-sm text-neutral-400 dark:text-neutral-500 font-mono">
                  {formatDate(noteMeta.date)}
                </p>
                <h2 className="mt-1 font-medium group-hover:underline underline-offset-2">
                  {noteMeta.title}
                </h2>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {noteMeta.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

function formatDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
