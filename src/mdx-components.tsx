import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="font-serif font-normal text-2xl mt-10 mb-3 text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-serif font-normal text-xl mt-8 mb-2 text-foreground">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="leading-relaxed mb-4 text-foreground">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed text-foreground">{children}</li>
  ),
  a: ({ href = "#", children, ...props }) => {
    if (href.startsWith("http") || href.startsWith("//")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline underline-offset-2 hover:opacity-75 transition-opacity"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className="text-accent underline underline-offset-2 hover:opacity-75 transition-opacity"
      >
        {children}
      </Link>
    );
  },
  code: ({ children, className }) => {
    if (className) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="text-sm font-mono bg-surface px-1.5 py-0.5 rounded">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-surface rounded-lg p-4 overflow-x-auto text-sm mb-4 font-mono">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-border pl-4 my-4 text-muted italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-border my-8" />,
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
