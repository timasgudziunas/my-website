import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import { getFieldNoteSlugs, type FieldNoteMetadata } from "@/lib/get-field-notes";

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
    <main className="max-w-2xl mx-auto px-6 py-12">
      <Link
        href="/field-notes"
        className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-foreground transition-colors"
      >
        ← Field Notes
      </Link>

      <header className="mt-8 mb-10">
        <p className="text-sm text-neutral-400 dark:text-neutral-500 font-mono">
          {formatDate(metadata.date)}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          {metadata.title}
        </h1>
        {metadata.description && (
          <p className="mt-3 text-neutral-500 dark:text-neutral-400 leading-relaxed">
            {metadata.description}
          </p>
        )}
      </header>

      <article>
        <Note />
      </article>
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
