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
    `@/content/projects/${slug}.mdx`
  )) as unknown as MdxModule;
  return metadata;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const { default: Project } = (await import(
    `@/content/projects/${slug}.mdx`
  )) as unknown as MdxModule;
  return (
    <main>
      <article>
        <Project />
      </article>
    </main>
  );
}

export function generateStaticParams() {
  return [{ slug: "getting-started" }];
}

export const dynamicParams = false;
