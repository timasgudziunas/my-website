"use client";

import { useActionState } from "react";
import { subscribeEmail, type EmailSignupState } from "@/app/email-signup-action";

const initialState: EmailSignupState = { status: "idle", message: "" };

export default function EmailSignup() {
  const [state, action, isPending] = useActionState(subscribeEmail, initialState);

  if (state.status === "success") {
    return (
      <section className="px-6 pb-20 max-w-2xl mx-auto">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">{state.message}</p>
      </section>
    );
  }

  return (
    <section className="px-6 pb-20 max-w-2xl mx-auto">
      <form action={action} className="flex gap-2 flex-wrap">
        <input
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          className="flex-1 min-w-0 px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700 rounded-md bg-transparent placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600"
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 text-sm font-medium rounded-md bg-foreground text-background hover:opacity-80 transition-opacity disabled:opacity-50"
        >
          {isPending ? "Sending…" : "Follow along"}
        </button>
      </form>
      {state.status === "error" && (
        <p className="mt-2 text-sm text-red-500">{state.message}</p>
      )}
    </section>
  );
}
