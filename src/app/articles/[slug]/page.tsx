import { notFound } from "next/navigation";
import { getArticleSlugs } from "@/lib/get-articles";

// NOTE: MDX rendering is stubbed out while src/content/articles/ is empty —
// Turbopack cannot compile a dynamic `import("@/content/articles/...mdx")`
// with zero matching files. When the first real article lands, restore the MDX
// import + generateMetadata from this file's git history.
export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default function ArticleDetailPage() {
  notFound();
}
