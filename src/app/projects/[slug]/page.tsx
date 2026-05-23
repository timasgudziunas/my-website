import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import { getProjectSlugs, type ProjectMetadata } from "@/lib/get-projects";

type MdxModule = {
  default: ComponentType;
  metadata: ProjectMetadata;
};

type Props = {
  params: Promise<{ slug: string }>;
};

const statusLabel: Record<ProjectMetadata["status"], string> = {
  active: "Active",
  completed: "Completed",
  paused: "Paused",
};

const statusClass: Record<ProjectMetadata["status"], string> = {
  active: "text-green-600 dark:text-green-400",
  completed: "text-neutral-400 dark:text-neutral-500",
  paused: "text-neutral-400 dark:text-neutral-500",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = (await import(
    `@/content/projects/${slug}.mdx`
  )) as MdxModule;
  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: `${metadata.title} — Timas Gudziunas`,
      description: metadata.description,
      url: `/projects/${slug}`,
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
  return getProjectSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const { default: Project, metadata } = (await import(
    `@/content/projects/${slug}.mdx`
  )) as MdxModule;

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <Link
        href="/projects"
        className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-foreground transition-colors"
      >
        ← Projects
      </Link>

      <header className="mt-8 mb-10">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-medium uppercase tracking-wide ${statusClass[metadata.status]}`}
          >
            {statusLabel[metadata.status]}
          </span>
          <span className="text-neutral-200 dark:text-neutral-700">·</span>
          <span className="text-sm text-neutral-400 dark:text-neutral-500 font-mono">
            {formatDate(metadata.date)}
          </span>
        </div>
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
        <Project />
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
