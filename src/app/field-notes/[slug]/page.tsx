import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import { getFieldNoteSlugs, type FieldNoteMetadata } from "@/lib/get-field-notes";
import { formatDate } from "@/lib/format-date";

type MdxModule = {
  default: ComponentType;
  metadata: FieldNoteMetadata;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = (await import(
    `@/content/field-notes/${slug}.mdx`
  )) as MdxModule;
  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: `${metadata.title} — Timas Gudziunas`,
      description: metadata.description,
      url: `/field-notes/${slug}`,
      type: "article",
      publishedTime: metadata.date,
    },
    twitter: {
      title: `${metadata.title} — Timas Gudziunas`,
      description: metadata.description,
    },
  };
}

export function generateStaticParams() {
  return getFieldNoteSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function NoteDetailPage({ params }: Props) {
  const { slug } = await params;
  const { default: Note, metadata } = (await import(
    `@/content/field-notes/${slug}.mdx`
  )) as MdxModule;

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <Link
        href="/field-notes"
        className="font-mono text-[11px] tracking-[0.1em] uppercase text-subtle hover:text-warm transition-colors duration-300"
      >
        ← Field Notes
      </Link>

      <header className="mt-10 mb-12">
        <span className="font-mono text-[10px] text-muted tracking-[0.15em] uppercase">
          {formatDate(metadata.date)}
        </span>
        <h1 className="mt-3 font-display font-light text-4xl md:text-5xl text-primary leading-tight">
          {metadata.title}
        </h1>
        {metadata.description && (
          <p className="mt-4 font-body italic text-lg text-muted leading-[1.75]">
            {metadata.description}
          </p>
        )}
      </header>

      <article className="prose">
        <Note />
      </article>
    </main>
  );
}
