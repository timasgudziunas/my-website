import type { Metadata } from "next";
import type { ComponentType } from "react";

type MdxModule = {
  default: ComponentType;
  metadata: Metadata;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = (await import(
    `@/content/field-notes/${slug}.mdx`
  )) as unknown as MdxModule;
  return metadata;
}

export default async function NoteDetailPage({ params }: Props) {
  const { slug } = await params;
  const { default: Note } = (await import(
    `@/content/field-notes/${slug}.mdx`
  )) as unknown as MdxModule;
  return (
    <main>
      <article>
        <Note />
      </article>
    </main>
  );
}

export function generateStaticParams() {
  return [{ slug: "hello-world" }];
}

export const dynamicParams = false;
