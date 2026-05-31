"use client";

import { useActionState } from "react";
import { subscribeEmail, type EmailSignupState } from "@/app/email-signup-action";

const initialState: EmailSignupState = { status: "idle", message: "" };

export default function EmailSignup() {
  const [state, action, isPending] = useActionState(subscribeEmail, initialState);

  if (state.status === "success") {
    return (
      <section className="px-6 py-20 max-w-5xl mx-auto border-t border-border">
        <p className="font-body text-sm italic text-muted">{state.message}</p>
      </section>
    );
  }

  return (
    <section className="px-6 py-20 max-w-5xl mx-auto border-t border-border">
      <div className="max-w-2xl">
        <h2 className="font-display font-light text-3xl text-primary">Follow along</h2>
        <p className="mt-3 font-body italic text-muted leading-[1.75]">
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
            className="flex-1 min-w-0 px-4 py-2.5 font-body text-sm border border-border rounded-[2px] bg-transparent placeholder:text-subtle focus:outline-none focus:border-muted transition-colors duration-300"
          />
          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2.5 font-mono text-[11px] tracking-[0.1em] uppercase rounded-[2px] bg-primary text-base hover:opacity-80 transition-opacity duration-300 disabled:opacity-50 whitespace-nowrap"
          >
            {isPending ? "Sending…" : "Subscribe"}
          </button>
        </form>
        {state.status === "error" && (
          <p className="mt-2 font-mono text-[10px] text-ember">{state.message}</p>
        )}
      </div>
    </section>
  );
}
