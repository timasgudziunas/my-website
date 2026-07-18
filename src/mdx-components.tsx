import type { MDXComponents } from "mdx/types";

// Required by @next/mdx (App Router). Styling overrides were removed in the
// reset — MDX renders as plain HTML until a new design system lands.
export function useMDXComponents(): MDXComponents {
  return {};
}
