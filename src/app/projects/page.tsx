import type { Metadata } from "next";
import Link from "next/link";
import { getProjectSlugs, type ProjectMetadata } from "@/lib/get-projects";

const description = "Things I'm building — tracked in public.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  openGraph: {
    title: "Projects — Timas Gudziunas",
    description,
    url: "/projects",
    type: "website",
  },
  twitter: {
    title: "Projects — Timas Gudziunas",
    description,
  },
};

type ProjectItem = { slug: string; metadata: ProjectMetadata };

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

export default async function ProjectsIndexPage() {
  const slugs = getProjectSlugs();

  const projects: ProjectItem[] = await Promise.all(
    slugs.map(async (slug) => {
      const mod = (await import(`@/content/projects/${slug}.mdx`)) as {
        metadata: ProjectMetadata;
      };
      return { slug, metadata: mod.metadata };
    })
  );

  projects.sort(
    (a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Things I&apos;m building — tracked in public.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">
          Nothing here yet. Check back soon.
        </p>
      ) : (
        <ul className="space-y-8">
          {projects.map(({ slug, metadata: projectMeta }) => (
            <li key={slug}>
              <Link href={`/projects/${slug}`} className="group block">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-medium uppercase tracking-wide ${statusClass[projectMeta.status]}`}
                  >
                    {statusLabel[projectMeta.status]}
                  </span>
                  <span className="text-neutral-200 dark:text-neutral-700">·</span>
                  <span className="text-sm text-neutral-400 dark:text-neutral-500 font-mono">
                    {formatDate(projectMeta.date)}
                  </span>
                </div>
                <h2 className="mt-1 font-medium group-hover:underline underline-offset-2">
                  {projectMeta.title}
                </h2>
                <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {projectMeta.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
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
