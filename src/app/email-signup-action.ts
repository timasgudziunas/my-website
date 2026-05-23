"use server";

import { resend } from "@/lib/resend";

export type EmailSignupState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function subscribeEmail(
  _prev: EmailSignupState,
  formData: FormData
): Promise<EmailSignupState> {
  const email = formData.get("email");

  if (typeof email !== "string" || !email.includes("@")) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    return { status: "error", message: "Something went wrong. Try again." };
  }

  try {
    await resend.contacts.create({ email, audienceId });
    return { status: "success", message: "You're in. I'll be in touch." };
  } catch {
    return { status: "error", message: "Something went wrong. Try again." };
  }
}
