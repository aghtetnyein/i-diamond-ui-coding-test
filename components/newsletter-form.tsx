"use client";

import { useActionState } from "react";
import { VscSend } from "react-icons/vsc";
import { subscribe, type NewsletterState } from "@/app/actions/newsletter";

const initialState: NewsletterState = { status: "idle", message: "", email: "" };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribe, initialState);
  const hasError = state.status === "error";

  return (
    <form action={formAction} className="relative mt-2.5 flex w-[340px] max-w-full lg:w-[422px]">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <input
        type="email"
        name="email"
        required
        defaultValue={state.email}
        autoComplete="email"
        placeholder="Email Address"
        aria-label="Email address"
        aria-invalid={hasError}
        aria-describedby="newsletter-status"
        className="h-8 min-w-0 flex-1 bg-white px-2.5 text-xs tracking-[0.36px] placeholder:text-body focus-visible:outline-accent lg:h-[46px] lg:text-sm lg:tracking-[0.42px]"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        disabled={pending}
        className="flex size-8 shrink-0 items-center justify-center bg-accent text-white hover:bg-navy disabled:opacity-60 lg:size-[46px]"
      >
        <VscSend className="size-3 lg:size-[18px]" />
      </button>
      <p
        id="newsletter-status"
        role="status"
        className={`absolute top-full left-0 mt-1 text-xs leading-4 ${hasError ? "text-red-700" : "text-green-700"}`}
      >
        {state.message}
      </p>
    </form>
  );
}
