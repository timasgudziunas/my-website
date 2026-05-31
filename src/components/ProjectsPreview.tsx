import Link from "next/link";
import ProjectCard from "./ProjectCard";
import { getProjectSlugs, type ProjectMetadata } from "@/lib/get-projects";

export default async function ProjectsPreview() {
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

  const latest = projects.slice(0, 3);

  return (
    <section className="px-6 py-16 max-w-5xl mx-auto border-t border-border">
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="font-display font-light text-3xl text-primary">Projects</h2>
        <Link
          href="/projects"
          className="font-mono text-[11px] tracking-[0.1em] uppercase text-subtle hover:text-warm transition-colors duration-300"
        >
          All projects →
        </Link>
      </div>
      {latest.length === 0 ? (
        <p className="font-body text-sm italic text-muted">Nothing here yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {latest.map(({ slug, metadata }) => (
            <ProjectCard key={slug} slug={slug} metadata={metadata} />
          ))}
        </div>
      )}
    </section>
  );
}
