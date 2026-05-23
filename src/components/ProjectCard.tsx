import Link from "next/link";
import ImagePlaceholder from "./ImagePlaceholder";
import type { ProjectMetadata } from "@/lib/get-projects";

type Props = {
  slug: string;
  metadata: ProjectMetadata;
};

export default function ProjectCard({ slug, metadata }: Props) {
  return (
    <Link href={`/projects/${slug}`} className="group block">
      <ImagePlaceholder label="project cover" aspectRatio="video" />
      <div className="mt-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs text-muted tracking-wide">
            {metadata.timelineDisplay}
          </span>
          {metadata.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs text-muted border border-border px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-2 font-serif font-normal text-xl leading-snug group-hover:text-accent transition-colors">
          {metadata.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted leading-relaxed line-clamp-2">
          {metadata.summary}
        </p>
      </div>
    </Link>
  );
}
