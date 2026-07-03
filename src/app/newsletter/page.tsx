import type { Metadata } from "next";
import EmailSignup from "@/components/EmailSignup";
import FieldNotesPreview from "@/components/FieldNotesPreview";

const description =
  "Occasional updates from an entrepreneurial journey documented in public — project milestones, lessons learned, and ideas worth sharing. No noise.";

export const metadata: Metadata = {
  title: "Newsletter",
  description,
  openGraph: {
    title: "Newsletter — Timas Gudziunas",
    description,
    url: "/newsletter",
    type: "website",
  },
  twitter: {
    title: "Newsletter — Timas Gudziunas",
    description,
  },
};

/** What subscribers get — rendered as a 3-up bento using the brand panel tints. */
const INBOX_ITEMS = [
  {
    tint: "bg-panel-sky",
    label: "Build logs",
    body: "What I'm making right now, and how it's actually going — shipped or not.",
  },
  {
    tint: "bg-panel-gold",
    label: "Honest lessons",
    body: "The setbacks and the things I got wrong, not just the highlight reel.",
  },
  {
    tint: "bg-panel-sand",
    label: "Early ideas",
    body: "Half-formed thoughts and experiments, before they land anywhere else.",
  },
];

export default function NewsletterPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-14 md:space-y-20">
      {/* Editorial header */}
      <header className="max-w-2xl">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-warm mb-6">
          The Dispatch — Newsletter
        </p>
        <h1 className="font-display font-light text-primary text-[clamp(2.4rem,6vw,4rem)] leading-[1.05]">
          Follow the journey,
          <br />
          <em className="text-warm">from the inside.</em>
        </h1>
        <p className="mt-6 font-body text-lg italic text-muted leading-[1.75]">
          Every so often I write up what I&apos;m building, what&apos;s working,
          what broke, and the ideas I can&apos;t stop thinking about. It goes to a
          small list of people who want to watch this unfold — no noise, no
          schedule pressure, just the real story as it happens.
        </p>
      </header>

      {/* Signup band */}
      <section className="rounded-2xl bg-panel-coffee p-8 md:p-12">
        <h2 className="font-display font-light text-2xl md:text-3xl text-dust">
          Join the list
        </h2>
        <p className="mt-3 font-body italic text-dust/70 leading-[1.75] max-w-xl">
          You&apos;re early — which is the best time to start following. Drop your
          email and come along.
        </p>
        <div className="mt-6 max-w-xl">
          <EmailSignup />
        </div>
        <p className="mt-5 font-mono text-[10px] tracking-[0.16em] uppercase text-dust/45">
          Occasional emails · No spam · Unsubscribe anytime
        </p>
      </section>

      {/* What you'll get */}
      <section>
        <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-subtle mb-6">
          What lands in your inbox
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {INBOX_ITEMS.map((item) => (
            <div key={item.label} className={`rounded-xl p-6 ${item.tint}`}>
              <h3 className="font-display font-light text-xl text-primary leading-snug">
                {item.label}
              </h3>
              <p className="mt-2 font-body text-sm italic text-muted leading-[1.75]">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Proof of momentum — a taste of what actually goes out */}
      <section>
        <p className="font-body italic text-muted leading-[1.75] mb-6 max-w-2xl">
          Not sure yet? Here&apos;s the kind of thing that lands — recent notes,
          free to read:
        </p>
        <FieldNotesPreview />
      </section>
    </main>
  );
}
