import Link from "next/link";
import ImagePlaceholder from "./ImagePlaceholder";
import { formatDate } from "@/lib/format-date";
import { getFieldNoteSlugs, type FieldNoteMetadata } from "@/lib/get-field-notes";

/**
 * The newest Field Note, surfaced as a card in the hero's bottom-right corner
 * (per references/hero-section-inspo…). Reinforces momentum + curiosity.
 * Renders nothing until at least one note exists.
 */
export default async function LatestFieldNoteCard({
  className = "",
}: {
  className?: string;
}) {
  const slugs = getFieldNoteSlugs();
  if (slugs.length === 0) return null;

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

  const { slug, metadata } = notes[0];

  return (
    <Link
      href={`/field-notes/${slug}`}
      className={`group block w-full max-w-xs overflow-hidden rounded-[4px] ring-1 ring-dust/10 shadow-[0_18px_44px_-20px_rgba(20,14,10,0.7)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 ${className}`}
    >
      {/* Picture fills the top */}
      <ImagePlaceholder label="cover" aspectRatio="video" rounded="rounded-none" />

      {/* Text sits directly below, on a low-opacity dark panel that blends into the hero */}
      <div className="flex items-end justify-between gap-4 bg-coffee/15 px-4 py-3.5">
        <div className="min-w-0">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-dust/55">
            Latest · Field Note
          </span>
          <h3 className="mt-1.5 font-display font-light text-lg leading-snug text-dust/90 truncate">
            {metadata.title}
          </h3>
          <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-dust/45">
            {formatDate(metadata.date)}
          </span>
        </div>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="w-4 h-4 shrink-0 text-dust/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      </div>
    </Link>
  );
}
