import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="text-xl font-semibold mt-8 mb-3">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-semibold mt-6 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="leading-relaxed mb-4 text-neutral-700 dark:text-neutral-300">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 mb-4 space-y-1 text-neutral-700 dark:text-neutral-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 mb-4 space-y-1 text-neutral-700 dark:text-neutral-300">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href = "#", children, ...props }) => {
    if (href.startsWith("http") || href.startsWith("//")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:opacity-70 transition-opacity"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className="underline underline-offset-2 hover:opacity-70 transition-opacity"
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
      <code className="text-sm font-mono bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 overflow-x-auto text-sm mb-4 font-mono">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-neutral-300 dark:border-neutral-600 pl-4 my-4 text-neutral-500 dark:text-neutral-400 italic">
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr className="border-neutral-200 dark:border-neutral-800 my-8" />
  ),
  strong: ({ children }) => (
    <strong className="font-semibold">{children}</strong>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
