export default function HeroSection() {
  return (
    <section className="px-6 pt-24 pb-20 max-w-5xl mx-auto">
      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-warm mb-8">
        Biomedical Engineer · Builder
      </p>

      <h1 className="font-display font-light text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.08] text-primary mb-8">
        Building in public.
        <br />
        <em>Documenting the journey.</em>
      </h1>

      <p className="font-body text-sm italic text-muted leading-[1.75] max-w-lg">
        Ambitious projects, honest reflections, and the thinking behind both —
        shared as it unfolds.
      </p>
    </section>
  );
}
