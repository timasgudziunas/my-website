import { notFound } from "next/navigation";
import { getFieldNoteSlugs } from "@/lib/get-field-notes";

// NOTE: MDX rendering is stubbed out while src/content/field-notes/ is empty —
// Turbopack cannot compile a dynamic `import("@/content/field-notes/...mdx")`
// with zero matching files. When the first real note lands, restore the MDX
// import + generateMetadata from this file's git history.
export function generateStaticParams() {
  return getFieldNoteSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default function NoteDetailPage() {
  notFound();
}
