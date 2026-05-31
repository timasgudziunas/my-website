import Link from "next/link";
import FieldNoteCard from "./FieldNoteCard";
import { getFieldNoteSlugs, type FieldNoteMetadata } from "@/lib/get-field-notes";

export default async function FieldNotesPreview() {
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

  const latest = notes.slice(0, 3);

  return (
    <section className="px-6 py-16 max-w-5xl mx-auto border-t border-border">
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="font-display font-light text-3xl text-primary">Field Notes</h2>
        <Link
          href="/field-notes"
          className="font-mono text-[11px] tracking-[0.1em] uppercase text-subtle hover:text-warm transition-colors duration-300"
        >
          All notes →
        </Link>
      </div>
      {latest.length === 0 ? (
        <p className="font-body text-sm italic text-muted">Nothing published yet.</p>
      ) : (
        <ul className="space-y-8">
          {latest.map(({ slug, metadata }) => (
            <li key={slug}>
              <FieldNoteCard slug={slug} metadata={metadata} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
