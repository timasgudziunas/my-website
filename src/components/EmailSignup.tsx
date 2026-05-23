"use client";

export default function EmailSignup() {
  return (
    <section className="px-6 pb-20 max-w-2xl mx-auto">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex gap-2 flex-wrap"
      >
        <input
          type="email"
          required
          placeholder="your@email.com"
          className="flex-1 min-w-0 px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded-md bg-transparent placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600"
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium rounded-md bg-foreground text-background hover:opacity-80 transition-opacity"
        >
          Follow along
        </button>
      </form>
    </section>
  );
}
