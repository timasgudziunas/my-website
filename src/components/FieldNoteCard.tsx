import Link from "next/link";
import { formatDate } from "@/lib/format-date";
import type { FieldNoteMetadata } from "@/lib/get-field-notes";

type Props = {
  slug: string;
  metadata: FieldNoteMetadata;
};

export default function FieldNoteCard({ slug, metadata }: Props) {
  return (
    <Link href={`/field-notes/${slug}`} className="group block">
      <span className="font-mono text-[10px] text-muted tracking-[0.15em] uppercase">
        {formatDate(metadata.date)}
      </span>
      <h3 className="mt-1 font-display font-light text-lg text-primary group-hover:text-warm transition-colors duration-300">
        {metadata.title}
      </h3>
      {metadata.description && (
        <p className="mt-1 font-body text-sm italic text-muted leading-[1.75]">
          {metadata.description}
        </p>
      )}
    </Link>
  );
}
