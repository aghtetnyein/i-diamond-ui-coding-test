"use client";

import { useActionState } from "react";
import { subscribe, type NewsletterState } from "@/app/actions/newsletter";

const initialState: NewsletterState = { status: "idle", message: "", email: "" };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribe, initialState);
  const hasError = state.status === "error";

  return (
    <form action={formAction} className="mt-4 flex max-w-md flex-col gap-2">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          defaultValue={state.email}
          autoComplete="email"
          placeholder="Enter your email"
          aria-label="Email address"
          aria-invalid={hasError}
          aria-describedby="newsletter-status"
          className="min-w-0 flex-1 border px-3 py-2"
        />
        <button type="submit" disabled={pending} className="border px-4 py-2 disabled:opacity-50">
          {pending ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      <p
        id="newsletter-status"
        role="status"
        className={hasError ? "text-sm text-red-600" : "text-sm text-green-700"}
      >
        {state.message}
      </p>
    </form>
  );
}
