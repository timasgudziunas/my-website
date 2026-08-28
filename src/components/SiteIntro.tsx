"use client";

import { useEffect, useRef, useState } from "react";
import TypewriterText, {
  type TypewriterLine,
} from "@/components/TypewriterText";

/** Copy and timing for the intro sequence. Edit this to change what plays.
 * `backspaceTo` keeps that prefix on screen while backspacing, and the next
 * line types over it. Lines without it backspace everything. */
const SITE_INTRO_SEQUENCE: {
  lines: TypewriterLine[];
  speed: number;
  deleteSpeed: number;
  delay: number;
} = {
  lines: [
    { text: "Hello" },
    { text: "I'm an engineer", backspaceTo: "I'm" },
    { text: "I'm a developer", backspaceTo: "I'm" },
    { text: "I'm a creator" },
    { text: "Oh shoot, of course" },
    { text: "I'm Timas" },
  ],
  speed: 70,
  deleteSpeed: 40,
  delay: 1200,
};

const SESSION_STORAGE_KEY = "site-intro-seen";
const POST_TYPE_HOLD_MS = 400;
const FADE_DURATION_MS = 500;

/**
 * Full-screen typewriter splash shown once per browser session, on top of
 * the whole site. Mounted first inside <body> in src/app/layout.tsx. The
 * sequence it types lives in SITE_INTRO_SEQUENCE above.
 */
export default function SiteIntro() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const hasExitedRef = useRef(false);
  const pendingTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Runs once per mount. Server and first client render both show the
  // overlay (isVisible starts true) so there's no hydration mismatch; if
  // this session has already seen it, hide immediately here instead. The
  // seen-key is written only in beginExit, never here: writing it on mount
  // made strict mode's double-invoked effect read back its own first run
  // and hide the intro instantly in dev, and it also means a refresh
  // mid-play replays instead of cutting off.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_STORAGE_KEY)) {
        // Syncing from sessionStorage, a source outside React that isn't
        // known until this effect runs on the client - the initial render
        // must stay `true` on both server and client to avoid a hydration
        // mismatch, so this one-time correction has to happen here.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsVisible(false);
      }
    } catch {
      // sessionStorage unavailable (e.g. private browsing) - just play.
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isVisible]);

  useEffect(() => {
    const pendingTimeouts = pendingTimeoutsRef.current;
    return () => {
      pendingTimeouts.forEach(clearTimeout);
    };
  }, []);

  function beginExit() {
    if (hasExitedRef.current) return;
    hasExitedRef.current = true;

    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
    } catch {
      // sessionStorage unavailable - nothing to persist, still exit visually.
    }

    setIsFading(true);
    pendingTimeoutsRef.current.push(
      setTimeout(() => setIsVisible(false), FADE_DURATION_MS)
    );
  }

  function handleTypewriterComplete() {
    pendingTimeoutsRef.current.push(
      setTimeout(beginExit, POST_TYPE_HOLD_MS)
    );
  }

  if (!isVisible) return null;

  return (
    <div
      onClick={beginExit}
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white text-neutral-950 transition-opacity duration-500 ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <TypewriterText
        text={SITE_INTRO_SEQUENCE.lines}
        speed={SITE_INTRO_SEQUENCE.speed}
        deleteSpeed={SITE_INTRO_SEQUENCE.deleteSpeed}
        delay={SITE_INTRO_SEQUENCE.delay}
        loop={false}
        onComplete={handleTypewriterComplete}
        className="text-3xl font-medium md:text-4xl"
      />
    </div>
  );
}
