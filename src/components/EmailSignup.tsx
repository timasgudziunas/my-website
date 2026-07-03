"use client";

import { useActionState } from "react";
import { subscribeEmail, type EmailSignupState } from "@/app/email-signup-action";

const initialState: EmailSignupState = { status: "idle", message: "" };

/**
 * Email capture form — the interactive core of the newsletter signup.
 * Designed to sit on a dark band (coffee/yale): inputs use light `dust` text.
 * Compose a heading + copy around it (see /newsletter and project detail pages).
 */
export default function EmailSignup() {
  const [state, action, isPending] = useActionState(subscribeEmail, initialState);

  if (state.status === "success") {
    return (
      <p className="font-body italic text-dust/80 leading-[1.75]">{state.message}</p>
    );
  }

  return (
    <>
      <form action={action} className="flex gap-3 flex-wrap">
        <input
          type="email"
          name="email"
          required
          placeholder="your@email.com"
          className="flex-1 min-w-0 px-4 py-2.5 font-body text-sm text-dust border border-dust/30 rounded-[2px] bg-transparent placeholder:text-dust/45 focus:outline-none focus:border-accent transition-colors duration-300"
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2.5 font-mono text-[11px] tracking-[0.1em] uppercase rounded-[2px] bg-accent text-coffee cursor-pointer hover:opacity-80 transition-opacity duration-300 disabled:opacity-50 whitespace-nowrap"
        >
          {isPending ? "Sending…" : "Subscribe"}
        </button>
      </form>
      {state.status === "error" && (
        <p className="mt-2 font-mono text-[10px] text-accent" role="alert">
          {state.message}
        </p>
      )}
    </>
  );
}
