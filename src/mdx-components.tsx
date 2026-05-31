import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="font-display font-light text-2xl mt-10 mb-3 text-primary not-italic">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-display font-light text-xl mt-8 mb-2 text-primary not-italic">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="leading-[1.75] mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-[1.75]">{children}</li>
  ),
  a: ({ href = "#", children, ...props }) => {
    if (href.startsWith("http") || href.startsWith("//")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-warm underline underline-offset-2 hover:opacity-75 transition-opacity duration-300"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className="text-warm underline underline-offset-2 hover:opacity-75 transition-opacity duration-300"
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
      <code className="font-mono text-sm bg-surface px-1.5 py-0.5 rounded-[2px] text-warm not-italic">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-surface rounded-[2px] p-4 overflow-x-auto text-sm mb-4 font-mono not-italic border border-border">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-border-warm pl-4 my-4 text-muted italic">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-border my-8" />,
  strong: ({ children }) => (
    <strong className="font-semibold not-italic text-primary">{children}</strong>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
