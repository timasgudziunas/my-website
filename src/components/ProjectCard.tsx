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
          <span className="font-mono text-[10px] text-muted tracking-[0.15em] uppercase">
            {metadata.timelineDisplay}
          </span>
          {metadata.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-[0.12em] uppercase text-warm border border-border-warm px-3 py-1 rounded-[2px]"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-2 font-display font-light text-xl leading-snug group-hover:text-warm transition-colors duration-300">
          {metadata.title}
        </h3>
        <p className="mt-1.5 font-body text-sm italic text-muted leading-[1.75] line-clamp-2">
          {metadata.summary}
        </p>
      </div>
    </Link>
  );
}
