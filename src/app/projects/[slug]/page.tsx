import { notFound } from "next/navigation";
import { getProjectSlugs } from "@/lib/get-projects";

// NOTE: MDX rendering is stubbed out while src/content/projects/ is empty —
// Turbopack cannot compile a dynamic `import("@/content/projects/...mdx")`
// with zero matching files. When the first real project lands, restore the MDX
// import + generateMetadata (incl. status/tags/links markup) from this file's
// git history.
export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default function ProjectDetailPage() {
  notFound();
}
