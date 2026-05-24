"use client";

import { useState, useEffect } from "react";

function getRelativeLabel(date: string): string {
  const diffMs = Date.now() - new Date(date).getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffDays < 1) return "Refreshed <1 day ago";
  if (diffDays < 7)
    return `Refreshed ${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
  const weeks = Math.floor(diffDays / 7);
  return `Refreshed ${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
}

export default function RefreshedLabel({ date }: { date: string }) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    setLabel(getRelativeLabel(date));
  }, [date]);

  if (!label) return null;

  return (
    <span className="font-mono text-xs text-muted tracking-wide">{label}</span>
  );
}
