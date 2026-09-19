import "server-only";

type Notification = {
  to: string;
  subject: string;
  text: string;
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM = "Newsletter <onboarding@resend.dev>";

// Delivers through Resend when RESEND_API_KEY is set, otherwise logs the message as if it was sent.
export async function sendNotification({ to, subject, text }: Notification) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info(`[mailer] to=${to} subject="${subject}"\n${text}`);
    return;
  }

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to, subject, text }),
  });

  if (!res.ok) throw new Error(`Resend request failed: ${res.status}`);
}
