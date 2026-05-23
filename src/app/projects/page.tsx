import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
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

export default async function ProjectsIndexPage() {
  const slugs = getProjectSlugs();

  const projects: { slug: string; metadata: ProjectMetadata }[] = await Promise.all(
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
    <main className="max-w-5xl mx-auto px-6 py-16">
      <header className="mb-14">
        <h1 className="font-serif font-normal text-5xl">Projects</h1>
        <p className="mt-4 text-muted leading-relaxed max-w-md">{description}</p>
      </header>

      {projects.length === 0 ? (
        <p className="text-sm text-muted">Nothing here yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map(({ slug, metadata: projectMeta }) => (
            <ProjectCard key={slug} slug={slug} metadata={projectMeta} />
          ))}
        </div>
      )}
    </main>
  );
}
