import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import { getProjectSlugs, type ProjectMetadata } from "@/lib/get-projects";
import { formatDate } from "@/lib/format-date";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import EmailSignup from "@/components/EmailSignup";

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = (await import(
    `@/content/projects/${slug}.mdx`
  )) as MdxModule;
  return {
    title: metadata.title,
    description: metadata.summary,
    openGraph: {
      title: `${metadata.title} — Timas Gudziunas`,
      description: metadata.summary,
      url: `/projects/${slug}`,
      type: "article",
      publishedTime: metadata.date,
    },
    twitter: {
      title: `${metadata.title} — Timas Gudziunas`,
      description: metadata.summary,
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
    <main>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Link
          href="/projects"
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          ← Projects
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-6">
        <ImagePlaceholder label="project cover" aspectRatio="video" />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <header className="mb-10">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-xs text-muted tracking-wide">
              {metadata.timelineDisplay}
            </span>
            <span className="text-border select-none">·</span>
            <span className="text-xs text-muted">{statusLabel[metadata.status]}</span>
          </div>

          <h1 className="mt-4 font-serif font-normal text-4xl md:text-5xl leading-tight">
            {metadata.title}
          </h1>

          <p className="mt-4 text-lg text-muted leading-relaxed">
            {metadata.summary}
          </p>

          {metadata.tags.length > 0 && (
            <div className="mt-5 flex gap-2 flex-wrap">
              {metadata.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-muted border border-border px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <article className="prose">
          <Project />
        </article>

        {metadata.links && metadata.links.length > 0 && (
          <div className="mt-14 pt-8 border-t border-border">
            <h2 className="font-mono text-xs text-muted tracking-widest uppercase mb-4">
              Links & Resources
            </h2>
            <ul className="space-y-2">
              {metadata.links.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:opacity-75 transition-opacity underline underline-offset-2"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {metadata.dateUpdated && (
          <p className="mt-10 text-xs text-muted font-mono">
            Last updated {formatDate(metadata.dateUpdated)}
          </p>
        )}
      </div>

      <EmailSignup />
    </main>
  );
}
