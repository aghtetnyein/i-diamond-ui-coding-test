# iDiamond — Next.js assessment

Landing page built with Next.js 16 (App Router, Cache Components), React 19 and Tailwind CSS v4.

## Getting started

Requires Node 22.18+ (the tests rely on Node running TypeScript files directly) and pnpm.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

| Script | Purpose |
| --- | --- |
| `pnpm dev` / `pnpm build` / `pnpm start` | Next.js |
| `pnpm lint` / `pnpm typecheck` | ESLint, `tsc --noEmit` |
| `pnpm test` | Unit tests (`node --test`, no extra tooling) |

## Environment

| Variable | Description |
| --- | --- |
| `EMAIL_ADDRESS` | Inbox that receives newsletter subscription notifications. Server-only. |
| `RESEND_API_KEY` | Optional. When set, notifications go out through Resend. Without it they are logged on the server. |

## Structure

```
app/
  actions/newsletter.ts     Server Action behind the footer form
  layout.tsx, page.tsx
components/
  layout/                   header, footer
  sections/                 page sections
  newsletter-form.tsx       the only client component
lib/
  testimonials.ts           cached data access
  newsletter.ts             zod schema for the form (+ test)
  mailer.ts                 notification transport
```

## Rendering strategy

| Piece | Strategy | Why |
| --- | --- | --- |
| Layout, header, footer, static sections | Static prerender | No request-time data, served from the CDN |
| Testimonials | Cached server data, revalidated hourly (ISR) | Third-party content that changes rarely |
| Newsletter form | Client component + Server Action | The only interactive part; everything else ships zero JS |
| Notification | Server only | `EMAIL_ADDRESS` never reaches the browser |

`next build` reports `/` as static with `Revalidate 1h / Expire 1d`.

## Newsletter

`components/newsletter-form.tsx` posts to the `subscribe` Server Action through `useActionState`.

- The browser validates first (`type="email"`, `required`). The action validates again with a zod schema (`lib/newsletter.ts`), because a Server Action is a public endpoint and the browser check accepts addresses like `foo@bar`.
- On success the action calls `sendNotification` with `process.env.EMAIL_ADDRESS` as the recipient.
- `lib/mailer.ts` sends through the Resend REST API when `RESEND_API_KEY` is set. Without a key it logs the message on the server, as the brief allows. It uses `fetch`, so there is no mail SDK in the bundle.
- The form has a honeypot field. A submission that fills it gets a normal success response and no email is sent. Rate limiting would be the next step and needs shared storage (Redis/KV), which is out of scope here.
- The form submits without JavaScript too, and keeps the typed value when validation fails.

## Testimonials API and caching

Endpoint: `GET https://testimonialapi.vercel.app/api`. Public, no API key, and it returns actual testimonial copy with name, job title, rating and avatar, so the section needs no placeholder text.

```ts
// lib/testimonials.ts
export async function getTestimonials(limit = 6): Promise<Testimonial[]> {
  "use cache";
  cacheLife("hours");

  const res = await fetch(`${API_ORIGIN}/api`);
  if (!res.ok) throw new Error(`Testimonials request failed: ${res.status}`);
  // map response → { id, name, role, quote, rating, avatar }
}
```

- `"use cache"` caches the mapped result, not just the HTTP response, so the data is fetched at build time and the page stays fully static.
- `cacheLife("hours")` serves the cached value and refreshes it in the background at most once an hour. Visitors never wait on the upstream API.
- The demo API never changes, so a time-based refresh is enough. With a CMS behind it, the next step would be `cacheTag` plus a webhook route that calls `revalidateTag`, which also allows a much longer `cacheLife`.
- Failed requests throw inside the cache scope, so an error is never cached. The section catches it and renders nothing, which keeps an upstream outage from breaking the build or the page.
- Avatars go through `next/image` (`images.remotePatterns` in `next.config.ts`), so they are resized, converted to modern formats and cached by Next.js.
