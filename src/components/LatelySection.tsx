import Link from "next/link";
import Image from "next/image";
import ImagePlaceholder from "./ImagePlaceholder";
import RefreshedLabel from "./RefreshedLabel";
import { lately } from "@/config/lately";

export default function LatelySection() {
  return (
    <section className="px-6 py-16 max-w-5xl mx-auto border-t border-border">
      <div className="flex items-baseline justify-between mb-10">
        <h2 className="font-display font-light text-3xl text-primary">Lately</h2>
        <RefreshedLabel date={lately.lastRefreshed} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Building */}
        <div>
          <span className="font-mono text-[10px] text-warm tracking-[0.2em] uppercase">
            Building
          </span>
          <h3 className="mt-3 font-display font-light text-xl text-primary leading-snug">
            {lately.building.title}
          </h3>
          <p className="mt-2 font-body text-sm italic text-muted leading-[1.75]">
            {lately.building.description}
          </p>
        </div>

        {/* Thinking About */}
        <div>
          <span className="font-mono text-[10px] text-warm tracking-[0.2em] uppercase">
            Thinking About
          </span>
          <ul className="mt-3 space-y-3">
            {lately.thinkingAbout.map((thought, i) => (
              <li
                key={i}
                className="font-body text-sm italic leading-[1.75] pl-4 border-l-2 border-border text-muted"
              >
                {thought}
              </li>
            ))}
          </ul>
        </div>

        {/* Current Obsession */}
        <div>
          <span className="font-mono text-[10px] text-warm tracking-[0.2em] uppercase">
            Current Obsession
          </span>
          <div className="mt-3">
            {lately.currentObsession.photo ? (
              <div className="relative w-full aspect-video mb-3 rounded-[2px] overflow-hidden">
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
            <p className="font-body text-sm italic text-muted leading-[1.75]">
              {lately.currentObsession.description}
            </p>
          </div>
        </div>

        {/* Reading */}
        <div>
          <span className="font-mono text-[10px] text-warm tracking-[0.2em] uppercase">
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
                  className="rounded-[2px] object-cover"
                />
              ) : (
                <ImagePlaceholder label="cover" aspectRatio="portrait" />
              )}
            </div>
            <div>
              <p className="font-display font-light text-[15px] text-primary leading-snug">
                {lately.reading.title}
              </p>
              <p className="mt-1 font-mono text-[10px] text-muted tracking-[0.1em] uppercase">
                {lately.reading.author}
              </p>
            </div>
          </div>
          <Link
            href="/past-reads"
            className="inline-block mt-4 font-mono text-[11px] tracking-[0.1em] uppercase text-subtle hover:text-warm transition-colors duration-300"
          >
            Past reads →
          </Link>
        </div>
      </div>
    </section>
  );
}
