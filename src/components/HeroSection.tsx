import LatestFieldNoteCard from "./LatestFieldNoteCard";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[78vh] lg:min-h-[90vh] flex flex-col justify-end">
      {/*
        Cinematic backdrop.
        The gradient stays as the reduced-motion / slow-connection fallback and
        sits *behind* the video, so it shows until the video paints.
        NOTE: /practice-video.mp4 is a TEMPORARY placeholder asset for layout
        review — swap for the real hero video before ship.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_120%_at_75%_15%,#1c5474_0%,#0f3b59_38%,#2a2018_100%)]"
      />
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      >
        <source src="/practice-video.mp4" type="video/mp4" />
      </video>
      {/* Vignette for headline legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,14,10,0.15)_0%,rgba(20,14,10,0)_35%,rgba(20,14,10,0.65)_100%)]"
      />

      {/* Content */}
      <div className="relative px-6 lg:px-12 pb-10 lg:pb-16 pt-24">
        <p className="font-mono text-[10px] lg:text-[11px] tracking-[0.28em] uppercase text-gold mb-6">
          Biomedical Engineer · Builder
        </p>

        <h1 className="font-display font-light text-dust text-[clamp(2.4rem,6vw,4.75rem)] leading-[1.02] max-w-[16ch]">
          Building in public.
          <br />
          <em className="text-[#e9dcc2]">Documenting the journey.</em>
        </h1>

        <p className="mt-8 font-body text-base lg:text-lg italic text-dust/80 leading-[1.7] max-w-lg">
          Ambitious projects, honest reflections, and the thinking behind both —
          shared as it unfolds.
        </p>

        {/* Latest Field Note — stacks below on mobile, pins bottom-right on desktop */}
        <div className="mt-10 lg:mt-0 lg:absolute lg:bottom-16 lg:right-12 lg:w-56">
          <LatestFieldNoteCard />
        </div>
      </div>
    </section>
  );
}
