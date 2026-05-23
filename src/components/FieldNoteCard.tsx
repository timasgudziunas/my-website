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
      <span className="font-mono text-xs text-muted tracking-wide">
        {formatDate(metadata.date)}
      </span>
      <h3 className="mt-1 text-base font-medium group-hover:text-accent transition-colors">
        {metadata.title}
      </h3>
      {metadata.description && (
        <p className="mt-1 text-sm text-muted leading-relaxed">
          {metadata.description}
        </p>
      )}
    </Link>
  );
}
