import type { Metadata } from "next";
import FieldNoteCard from "@/components/FieldNoteCard";
import { getFieldNoteSlugs, type FieldNoteMetadata } from "@/lib/get-field-notes";

const description =
  "Thoughts, research, reflections, and lessons documented in real time.";

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

export default async function NotesIndexPage() {
  const slugs = getFieldNoteSlugs();

  const notes: { slug: string; metadata: FieldNoteMetadata }[] = await Promise.all(
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
    <main className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-14">
        <h1 className="font-serif font-normal text-5xl">Field Notes</h1>
        <p className="mt-4 text-muted leading-relaxed max-w-md">{description}</p>
      </header>

      {notes.length === 0 ? (
        <p className="text-sm text-muted">Nothing published yet. Check back soon.</p>
      ) : (
        <ul className="space-y-10">
          {notes.map(({ slug, metadata: noteMeta }) => (
            <li key={slug}>
              <FieldNoteCard slug={slug} metadata={noteMeta} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
