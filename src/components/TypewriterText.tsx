"use client";

import { useEffect, useRef, useState } from "react";

export interface TypewriterTextProps {
  text: string | string[];
  speed?: number;
  cursor?: string;
  loop?: boolean;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
  /** Fires once after the final line finishes typing and its hold delay
   * elapses. Never fires when `loop` is true (the sequence never ends). */
  onComplete?: () => void;
}

type Phase = "typing" | "deleting" | "done";

/**
 * Adapted from a 21st.dev reference Typewriter component. Two fixes over
 * the reference:
 * - Text is derived from `currentText.slice(0, charCount)` instead of
 *   appended into a separate `displayText` state, which under React 19
 *   strict mode's double-invoked effects could double up characters.
 * - The reference only ever advanced past a line when `loop` was true,
 *   so a non-looping multi-line sequence stalled forever on the first
 *   line. Here, non-loop mode types each line, holds, deletes, and types
 *   the next line in turn; the final line is left on screen (no delete)
 *   and `onComplete` fires once after it finishes typing plus one `delay`
 *   hold.
 */
export default function TypewriterText({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className,
  onComplete,
}: TypewriterTextProps) {
  const textArray = Array.isArray(text) ? text : [text];

  const [lineIndex, setLineIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  // Kept in a ref so the effect below doesn't need onComplete in its
  // dependency array (an inline arrow prop would otherwise re-trigger it).
  // Assigned in its own effect, not during render, per react-hooks/refs.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const currentText = textArray[lineIndex] ?? "";
  const isLastLine = lineIndex === textArray.length - 1;

  useEffect(() => {
    if (phase === "done") return;

    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (charCount < currentText.length) {
        timeoutId = setTimeout(() => {
          setCharCount((count) => count + 1);
        }, speed);
      } else if (!loop && isLastLine) {
        timeoutId = setTimeout(() => {
          setPhase("done");
          onCompleteRef.current?.();
        }, delay);
      } else {
        timeoutId = setTimeout(() => {
          setPhase("deleting");
        }, delay);
      }
    } else {
      // phase === "deleting"
      if (charCount > 0) {
        timeoutId = setTimeout(() => {
          setCharCount((count) => count - 1);
        }, deleteSpeed);
      } else {
        timeoutId = setTimeout(() => {
          setLineIndex((index) => (index + 1) % textArray.length);
          setPhase("typing");
        }, 0);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [
    phase,
    charCount,
    currentText,
    isLastLine,
    loop,
    speed,
    deleteSpeed,
    delay,
    textArray.length,
  ]);

  const displayText = currentText.slice(0, charCount);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">{cursor}</span>
    </span>
  );
}
