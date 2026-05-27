"use client";

import { useEffect, useRef, useState } from "react";

// How many pixels of scroll the user gets per second of video.
// Raise to slow the scrub down; lower to speed it up.
const SCROLL_PX_PER_SECOND = 700;

// Advance currentTime in N-frame increments. >1 skips frames and multiplies
// the scrub speed by N; the video reaches its last frame at progress = 1/N
// and holds there for the remaining scroll.
const FRAME_STEP = 2;

// Extra scrub-speed multiplier on top of FRAME_STEP.
const SCRUB_SPEED = 1.3;

// Framerate of the hero clip. Used to convert FRAME_STEP into a time snap.
const FPS = 24;

export default function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [wrapperHeight, setWrapperHeight] = useState("300vh");

  useEffect(() => {
    // Native scroll listener — fires synchronously on the scroll event, before
    // any framework batching, giving the minimum possible seek latency.
    const handleScroll = () => {
      const wrapper = wrapperRef.current;
      const video = videoRef.current;
      if (!wrapper || !video || !video.duration) return;

      // Progress is the scroll position relative to the hero wrapper —
      // -rect.top is how far the wrapper has been pushed above the viewport
      // top. Scrubbing begins on the first scroll input that pulls the hero
      // into the top of the viewport, regardless of where the hero sits in
      // the document.
      const scrubRange = video.duration * SCROLL_PX_PER_SECOND;
      const progress = Math.max(0, Math.min(1, -wrapper.getBoundingClientRect().top / scrubRange));
      const stepSeconds = FRAME_STEP / FPS;
      const raw = progress * video.duration * FRAME_STEP * SCRUB_SPEED;
      const stepped = Math.round(raw / stepSeconds) * stepSeconds;
      video.currentTime = Math.min(stepped, video.duration);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Sync on mount in case the page was already scrolled (e.g. back-navigation)
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Tall wrapper — height drives scroll travel. -mt-[55px] lifts it under
    // the sticky nav so its top sits at y=0, letting the scrub fire on the
    // first scroll input. 55px = nav height (py-[15px] × 2 + text line-height + 1px border).
    <div ref={wrapperRef} className="relative -mt-[55px]" style={{ height: wrapperHeight }}>
      {/* Sticky clip container — stays in viewport while wrapper scrolls */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={videoRef}
          src="/hero-scroll-1.mp4"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={() => {
            const video = videoRef.current;
            if (!video) return;
            // Show the first frame immediately
            video.currentTime = 0;
            // Scroll length is tied to video duration only — FRAME_STEP controls
            // scrub speed via the currentTime mapping, not the section length.
            const px = window.innerHeight + video.duration * SCROLL_PX_PER_SECOND;
            setWrapperHeight(`${Math.round(px)}px`);
          }}
          className="absolute inset-0 w-full h-full object-contain object-top"
        />
      </div>
    </div>
  );
}
