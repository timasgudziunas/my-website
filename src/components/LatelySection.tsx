import Link from "next/link";
import Image from "next/image";
import ImagePlaceholder from "./ImagePlaceholder";
import RefreshedLabel from "./RefreshedLabel";
import { lately } from "@/config/lately";

export default function LatelySection() {
  return (
    <section className="px-6 py-16 max-w-5xl mx-auto border-t border-border">
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="font-serif font-normal text-3xl">Lately</h2>
        <RefreshedLabel date={lately.lastRefreshed} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Building */}
        <div>
          <span className="font-mono text-xs text-muted tracking-widest uppercase">
            Building
          </span>
          <h3 className="mt-3 font-serif font-normal text-xl leading-snug">
            {lately.building.title}
          </h3>
          <p className="mt-2 text-sm text-muted leading-relaxed">
            {lately.building.description}
          </p>
        </div>

        {/* Thinking About */}
        <div>
          <span className="font-mono text-xs text-muted tracking-widest uppercase">
            Thinking About
          </span>
          <ul className="mt-3 space-y-3">
            {lately.thinkingAbout.map((thought, i) => (
              <li
                key={i}
                className="text-sm leading-relaxed pl-4 border-l-2 border-border"
              >
                {thought}
              </li>
            ))}
          </ul>
        </div>

        {/* Current Obsession */}
        <div>
          <span className="font-mono text-xs text-muted tracking-widest uppercase">
            Current Obsession
          </span>
          <div className="mt-3">
            {lately.currentObsession.photo ? (
              <div className="relative w-full aspect-video mb-3 rounded-xl overflow-hidden">
                <Image
                  src={lately.currentObsession.photo}
                  alt="current obsession"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="mb-3">
                <ImagePlaceholder label="photo" aspectRatio="video" />
              </div>
            )}
            <p className="text-sm text-muted leading-relaxed">
              {lately.currentObsession.description}
            </p>
          </div>
        </div>

        {/* Reading */}
        <div>
          <span className="font-mono text-xs text-muted tracking-widest uppercase">
            Reading
          </span>
          <div className="mt-3 flex gap-4 items-start">
            <div className="w-16 flex-shrink-0">
              {lately.reading.coverImage ? (
                <Image
                  src={lately.reading.coverImage}
                  alt={lately.reading.title}
                  width={64}
                  height={96}
                  className="rounded object-cover"
                />
              ) : (
                <ImagePlaceholder label="cover" aspectRatio="portrait" />
              )}
            </div>
            <div>
              <p className="font-serif font-normal text-base leading-snug">
                {lately.reading.title}
              </p>
              <p className="mt-1 text-sm text-muted">{lately.reading.author}</p>
            </div>
          </div>
          <Link
            href="/past-reads"
            className="inline-block mt-4 text-xs font-mono text-muted hover:text-foreground transition-colors tracking-wide"
          >
            Past reads →
          </Link>
        </div>
      </div>
    </section>
  );
}
