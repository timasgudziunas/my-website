import ImagePlaceholder from "./ImagePlaceholder";

export default function HeroSection() {
  return (
    <section className="px-6 pt-16 pb-20 max-w-5xl mx-auto">
      <div className="max-w-3xl">
        <h1 className="font-serif font-normal text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-balance">
          Biomedical engineer building ambitious projects in public to foster
          lifelong learning and a more curious future.
        </h1>
        <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl">
          I write about what I&apos;m learning and building. Subscribe and
          I&apos;ll send updates when something worth sharing happens.
        </p>
      </div>
      <div className="mt-14">
        <ImagePlaceholder label="intro video" aspectRatio="video" />
      </div>
    </section>
  );
}
