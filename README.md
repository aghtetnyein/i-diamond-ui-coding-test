# Diamond Jewelry Dubai

Next.js assessment. One page built from the Figma file, desktop (1440) and mobile (375).

Stack: Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript.

## Run it

Needs Node 22.18+ and pnpm.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Other scripts: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm test`.

## Environment

| Variable | |
| --- | --- |
| `EMAIL_ADDRESS` | Inbox that gets the newsletter notification. Server only. |
| `RESEND_API_KEY` | Optional. With it the notification is a real email sent through Resend. Without it the message is logged on the server. |

## Newsletter

The footer form posts to a Server Action (`app/actions/newsletter.ts`).

- The email is checked in the browser (`type="email"`) and again on the server with zod. The server check is the one that counts, since a Server Action can be called directly.
- A valid submit sends a plain notification to `process.env.EMAIL_ADDRESS` through `lib/mailer.ts`.
- A hidden honeypot field catches simple bots. They get a normal success response and nothing is sent.
- The form works without JavaScript and keeps the typed value when validation fails.

## Testimonials API and caching

Endpoint: `GET https://testimonialapi.vercel.app/api`. It is public, needs no key, and returns name, job title, photo and a quote for each person.

```ts
// lib/testimonials.ts
export async function getTestimonials(): Promise<Testimonial[]> {
  "use cache";
  cacheLife("hours");

  const res = await fetch(`${API_ORIGIN}/api`);
  if (!res.ok) throw new Error(`Testimonials request failed: ${res.status}`);
  // map the response to { id, name, role, quote, avatar }
}
```

- `"use cache"` stores the mapped result. The API is called at build time and the data ships inside the static HTML, so a visitor never waits on it.
- `cacheLife("hours")` refreshes the data in the background about once an hour. `next build` shows `/` as static with `Revalidate 1h`.
- A failed request throws, so an error is never cached. The section catches it and renders nothing, which keeps an API outage from breaking the page or the build.
- Photos go through `next/image`, so they are resized and cached too.

If testimonials came from a CMS, I would add `cacheTag` and a webhook that calls `revalidateTag`, then raise the cache lifetime.
