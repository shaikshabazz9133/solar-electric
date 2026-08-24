"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

type State = "idle" | "loading" | "done" | "error";

export function NewsletterForm() {
  const id = useId();
  const reduce = usePrefersReducedMotion();
  const [state, setState] = useState<State>("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setState("error");
      return;
    }

    setState("loading");
    // Demo only — wire this to your ESP (Mailchimp, Resend, Klaviyo…).
    await new Promise((resolve) => setTimeout(resolve, 900));
    setState("done");
    setEmail("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:min-w-104 lg:max-w-md"
      noValidate
    >
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            id={id}
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            placeholder="you@example.com"
            aria-invalid={state === "error"}
            aria-describedby={`${id}-status`}
            onChange={(event) => {
              setEmail(event.target.value);
              if (state === "error") setState("idle");
            }}
            className="h-12 w-full rounded-full border border-white/15 bg-white/10 px-5 text-[0.9375rem] text-white placeholder:text-brand-200/75 transition-colors focus:border-brand-400 focus:bg-white/15 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={state === "loading" || state === "done"}
          className="sheen-hover relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-6 text-[0.9375rem] font-semibold text-flag-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-flag-50 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-70"
        >
          {/* Each label swaps with a small vertical roll, so the state change
              is legible even out of the corner of your eye. */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={state}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2"
            >
              {state === "loading" ? (
                <>
                  <Loader2 aria-hidden className="size-4 animate-spin" />
                  Joining
                </>
              ) : state === "done" ? (
                <>
                  <Check aria-hidden className="size-4" />
                  Subscribed
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight aria-hidden className="size-4" />
                </>
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <p
        id={`${id}-status`}
        role="status"
        aria-live="polite"
        className="mt-2.5 min-h-5 px-1 text-[0.8125rem]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={state}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="inline-block"
          >
            {state === "error" ? (
              <span className="text-flag-300">
                Please enter a valid email address.
              </span>
            ) : state === "done" ? (
              <span className="text-brand-200">
                You&apos;re on the list — look out for the next issue.
              </span>
            ) : (
              <span className="text-brand-200/85">
                Unsubscribe any time. We never share your address.
              </span>
            )}
          </motion.span>
        </AnimatePresence>
      </p>
    </form>
  );
}
