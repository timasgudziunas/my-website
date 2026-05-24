"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const SCROLL_RANGE = 180;

export default function SiteNav() {
  const [progress, setProgress] = useState(0);
  const imasRef = useRef<HTMLSpanElement>(null);
  const spaceRef = useRef<HTMLSpanElement>(null);
  const udzRef = useRef<HTMLSpanElement>(null);
  const [imasWidth, setImasWidth] = useState(200);
  const [spaceWidth, setSpaceWidth] = useState(8);
  const [udzWidth, setUdzWidth] = useState(200);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.fonts.ready.then(() => {
      if (imasRef.current) setImasWidth(imasRef.current.offsetWidth);
      if (spaceRef.current) setSpaceWidth(spaceRef.current.offsetWidth);
      if (udzRef.current) setUdzWidth(udzRef.current.offsetWidth);
    });

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setProgress(Math.min(window.scrollY / SCROLL_RANGE, 1));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const p = prefersReduced.current ? (progress > 0.5 ? 1 : 0) : progress;

  // Phase 1: inner letters collapse horizontally (p: 0 → 0.65)
  const innerP = Math.min(p / 0.65, 1);

  // Phase 2: T and G text fade out (p: 0.60 → 0.90)
  const initialsOpacity = 1 - Math.max(0, Math.min((p - 0.6) / 0.3, 1));

  // Phase 3: TG logo scales and fades in (p: 0.55 → 0.85)
  const logoP = Math.max(0, Math.min((p - 0.55) / 0.3, 1));

  const collapseStyle = (width: number): React.CSSProperties => ({
    display: "inline-block",
    overflow: "hidden",
    maxWidth: `${width * (1 - innerP)}px`,
    opacity: 1 - innerP,
    verticalAlign: "baseline",
    whiteSpace: "nowrap",
  });

  return (
    <header className="sticky top-0 z-50 px-6 py-[15px] flex items-center justify-between border-b border-border bg-background">
      <Link
        href="/"
        aria-label="Timas Gudziunas"
        className="relative flex items-center font-serif text-base hover:opacity-60 transition-opacity"
      >
        {/* Full name — inner letters collapse, T and G stay until logo arrives */}
        <span
          aria-hidden="true"
          className="flex items-baseline whitespace-nowrap"
          style={{ opacity: initialsOpacity }}
        >
          <span>T</span>
          {/* "imas" and the word-space are separate spans so the space isn't
              clipped by the overflow:hidden on the letters span */}
          <span ref={imasRef} style={collapseStyle(imasWidth)}>imas</span>
          <span ref={spaceRef} style={collapseStyle(spaceWidth)}>{" "}</span>
          <span>G</span>
          <span ref={udzRef} style={collapseStyle(udzWidth)}>udziunas</span>
        </span>

        {/* TG monogram — emerges as the text condenses */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 flex items-center"
          style={{
            opacity: logoP,
            transform: `translateY(2px) scale(${0.88 + 0.12 * logoP})`,
            transformOrigin: "left center",
          }}
        >
          {/* mix-blend-mode: multiply makes the white PNG background transparent on the warm cream bg */}
          <Image
            src="/tg-logo-light.png"
            alt=""
            width={30}
            height={30}
            className="block dark:hidden"
            style={{ mixBlendMode: "multiply" }}
          />
          <Image
            src="/tg-logo-dark.png"
            alt=""
            width={30}
            height={30}
            className="hidden dark:block"
          />
        </span>
      </Link>

      <nav className="flex gap-6 text-sm text-muted">
        <Link
          href="/field-notes"
          className="hover:text-foreground transition-colors"
        >
          Field Notes
        </Link>
        <Link
          href="/projects"
          className="hover:text-foreground transition-colors"
        >
          Projects
        </Link>
      </nav>
    </header>
  );
}
