"use server";

import { sendNotification } from "@/lib/mailer";
import { newsletterSchema } from "@/lib/newsletter";

export type NewsletterState = {
  status: "idle" | "success" | "error";
  message: string;
  email: string;
};

const SUCCESS: NewsletterState = { status: "success", message: "Thanks for subscribing!", email: "" };

export async function subscribe(
  _prevState: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  // Honeypot: real users never see this field. Bots get a success response and no email is sent.
  if (formData.get("company")) return SUCCESS;

  const email = String(formData.get("email") ?? "");
  const parsed = newsletterSchema.safeParse({ email });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0].message, email };
  }

  try {
    const recipient = process.env.EMAIL_ADDRESS;
    if (!recipient) throw new Error("EMAIL_ADDRESS is not set");

    await sendNotification({
      to: recipient,
      subject: "New newsletter subscriber",
      text: `${parsed.data.email} subscribed to the newsletter.`,
    });
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Something went wrong. Please try again later.", email };
  }

  return SUCCESS;
}
