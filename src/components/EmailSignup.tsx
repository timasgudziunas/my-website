"use client";

import { useActionState } from "react";
import { subscribeEmail, type EmailSignupState } from "@/app/email-signup-action";

const initialState: EmailSignupState = { status: "idle", message: "" };

export default function EmailSignup() {
  const [state, action, isPending] = useActionState(subscribeEmail, initialState);

  if (state.status === "success") {
    return (
      <section className="px-6 py-20 max-w-5xl mx-auto border-t border-border">
        <p className="text-sm text-muted">{state.message}</p>
      </section>
    );
  }

  return (
    <section className="px-6 py-20 max-w-5xl mx-auto border-t border-border">
      <div className="max-w-2xl">
        <h2 className="font-serif font-normal text-3xl">Follow along</h2>
        <p className="mt-3 text-muted leading-relaxed">
          I send occasional updates when something worth sharing happens — a
          project milestone, a lesson learned, or something I&apos;ve been
          thinking about. No noise.
        </p>
        <form action={action} className="mt-6 flex gap-3 flex-wrap">
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            className="flex-1 min-w-0 px-4 py-2.5 text-sm border border-border rounded-lg bg-transparent placeholder:text-muted focus:outline-none focus:border-muted transition-colors"
          />
          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2.5 text-sm font-medium rounded-lg bg-foreground text-background hover:opacity-80 transition-opacity disabled:opacity-50 whitespace-nowrap"
          >
            {isPending ? "Sending…" : "Subscribe"}
          </button>
        </form>
        {state.status === "error" && (
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        )}
      </div>
    </section>
  );
}
