"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { ArrowRight, CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/data/services";

type Values = {
  name: string;
  email: string;
  phone: string;
  postcode: string;
  service: string;
  property: string;
  timeline: string;
  message: string;
  consent: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = {
  name: "",
  email: "",
  phone: "",
  postcode: "",
  service: "",
  property: "Residential",
  timeline: "As soon as possible",
  message: "",
  consent: false,
};

const properties = ["Residential", "Commercial", "Industrial", "Multi-family"];
const timelines = [
  "As soon as possible",
  "Within a month",
  "1–3 months",
  "Just researching",
];

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please tell us your name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (values.phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Enter a 10-digit phone number.";
  }
  if (!values.service) {
    errors.service = "Choose the service you need.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "A sentence or two helps us quote accurately.";
  }
  if (!values.consent) {
    errors.consent = "Please agree so we can contact you back.";
  }

  return errors;
}

export function ContactForm({
  defaultService,
}: {
  defaultService?: string;
}) {
  const formId = useId();
  const reduce = usePrefersReducedMotion();
  const [values, setValues] = useState<Values>({
    ...initial,
    service: defaultService ?? "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((previous) => ({ ...previous, [key]: value }));
    if (errors[key]) {
      setErrors((previous) => {
        const next = { ...previous };
        delete next[key];
        return next;
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const firstKey = Object.keys(found)[0];
      document.getElementById(`${formId}-${firstKey}`)?.focus();
      return;
    }

    setStatus("submitting");
    // Demo submit. Point this at a route handler, CRM webhook or form service.
    await new Promise((resolve) => setTimeout(resolve, 1100));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        role="status"
        className="rounded-4xl border border-emerald-200 bg-emerald-50/60 p-8 text-center sm:p-12"
      >
        <motion.span
          initial={reduce ? false : { scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 16, delay: 0.1 }}
          className="relative mx-auto grid size-16 place-items-center rounded-full bg-emerald-600 text-white"
        >
          {/* One ring pulses outward on arrival, then stops */}
          {reduce ? null : (
            <motion.span
              aria-hidden
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.9, opacity: 0 }}
              transition={{ duration: 1.1, delay: 0.25, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-emerald-500"
            />
          )}
          <CheckCircle2 aria-hidden className="relative size-8" />
        </motion.span>
        <h2 className="mt-6 font-display text-2xl font-bold text-ink-950">
          Thanks, {values.name.split(" ")[0]} — that&apos;s with us
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-600">
          A licensed electrician will review your details and come back within
          one business day. If it&apos;s urgent, call us and we&apos;ll dispatch
          today.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            variant="ghost"
            onClick={() => {
              setValues(initial);
              setStatus("idle");
            }}
          >
            Send another request
          </Button>
          <Button href="/projects">
            Browse our projects
            <ArrowRight aria-hidden className="size-4" />
          </Button>
        </div>
      </motion.div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-4xl border border-ink-100 bg-white p-6 shadow-lift sm:p-8"
    >
      <h2 className="font-display text-xl font-bold text-ink-950 sm:text-2xl">
        Request a free quote
      </h2>
      <p className="mt-2 text-[0.9375rem] text-ink-600">
        Fixed price, clear scope, no obligation. Most quotes land within 48
        hours.
      </p>

      <AnimatePresence>
        {hasErrors ? (
          <motion.div
            role="alert"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={
              reduce
                ? { opacity: 1 }
                : // A short shake: the alert only ever appears in response to
                  // a failed submit, so it should read as a rejection.
                  { opacity: 1, y: 0, x: [0, -7, 6, -4, 0] }
            }
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.28,
              ease: [0.22, 1, 0.36, 1],
              x: { duration: 0.42, ease: "easeOut" },
            }}
            className="mt-6 flex items-start gap-3 rounded-2xl border border-flag-200 bg-flag-50 p-4 text-[0.875rem] text-flag-800"
          >
            <TriangleAlert aria-hidden className="mt-0.5 size-4.5 shrink-0" />
            <span>
              Please check the highlighted fields — {Object.keys(errors).length}{" "}
              {Object.keys(errors).length === 1 ? "needs" : "need"} attention.
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label="Full name"
          required
          error={errors.name}
        >
          <input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            className={inputClass(Boolean(errors.name))}
            placeholder="Jordan Rivera"
          />
        </Field>

        <Field
          id={`${formId}-email`}
          label="Email"
          required
          error={errors.email}
        >
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            className={inputClass(Boolean(errors.email))}
            placeholder="you@example.com"
          />
        </Field>

        <Field
          id={`${formId}-phone`}
          label="Phone"
          required
          error={errors.phone}
        >
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
            className={inputClass(Boolean(errors.phone))}
            placeholder="(512) 555-0142"
          />
        </Field>

        <Field id={`${formId}-postcode`} label="ZIP code" hint="Optional">
          <input
            id={`${formId}-postcode`}
            name="postcode"
            inputMode="numeric"
            autoComplete="postal-code"
            value={values.postcode}
            onChange={(event) => update("postcode", event.target.value)}
            className={inputClass(false)}
            placeholder="78701"
          />
        </Field>

        <Field
          id={`${formId}-service`}
          label="What do you need?"
          required
          error={errors.service}
          className="sm:col-span-2"
        >
          <select
            id={`${formId}-service`}
            name="service"
            value={values.service}
            onChange={(event) => update("service", event.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={
              errors.service ? `${formId}-service-error` : undefined
            }
            className={inputClass(Boolean(errors.service))}
          >
            <option value="">Select a service…</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </Field>

        <Field id={`${formId}-property`} label="Property type">
          <select
            id={`${formId}-property`}
            name="property"
            value={values.property}
            onChange={(event) => update("property", event.target.value)}
            className={inputClass(false)}
          >
            {properties.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id={`${formId}-timeline`} label="Timeline">
          <select
            id={`${formId}-timeline`}
            name="timeline"
            value={values.timeline}
            onChange={(event) => update("timeline", event.target.value)}
            className={inputClass(false)}
          >
            {timelines.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          id={`${formId}-message`}
          label="Tell us about the job"
          required
          error={errors.message}
          className="sm:col-span-2"
        >
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? `${formId}-message-error` : undefined
            }
            className={cn(inputClass(Boolean(errors.message)), "h-auto py-3.5")}
            placeholder="Two-storey house built in 1998, breakers tripping when the AC starts, and we're adding an EV charger in the spring…"
          />
        </Field>
      </div>

      <div className="mt-6">
        <label
          htmlFor={`${formId}-consent`}
          className="flex cursor-pointer items-start gap-3 text-[0.875rem] leading-relaxed text-ink-600"
        >
          <input
            id={`${formId}-consent`}
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            className={cn(
              "mt-0.5 size-5 shrink-0 cursor-pointer rounded-md border-2 accent-brand-600",
              errors.consent ? "border-flag-500" : "border-ink-300",
            )}
          />
          <span>
            I agree to be contacted about this enquiry. We never sell or share
            your details.
          </span>
        </label>
        {errors.consent ? (
          <p className="mt-2 pl-8 text-[0.8125rem] font-medium text-flag-700">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        size="lg"
        fullWidth
        className="mt-7"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 aria-hidden className="size-5 animate-spin" />
            Sending your request…
          </>
        ) : (
          <>
            Send my request
            <ArrowRight
              aria-hidden
              className="size-5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </>
        )}
      </Button>

      <p className="mt-4 text-center text-[0.8125rem] text-ink-500">
        Prefer to talk? Call us — an electrician answers, day or night.
      </p>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

function inputClass(hasError: boolean) {
  return cn(
    "h-12 w-full rounded-2xl border bg-ink-50/60 px-4 text-[0.9375rem] text-ink-900",
    "placeholder:text-ink-500 transition-all duration-300 focus:bg-white focus:outline-none",
    hasError
      ? "border-flag-400 focus:border-flag-500 focus:shadow-[0_0_0_4px_rgba(163,44,68,0.12)]"
      : "border-ink-200 focus:border-brand-400 focus:shadow-[0_0_0_4px_rgba(71,111,184,0.12)]",
  );
}

function Field({
  id,
  label,
  children,
  error,
  hint,
  required,
  className,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <label
          htmlFor={id}
          className="text-[0.8125rem] font-semibold text-ink-800"
        >
          {label}
          {required ? (
            <span className="ml-1 text-flag-600" aria-hidden>
              *
            </span>
          ) : null}
        </label>
        {hint ? (
          <span className="text-[0.75rem] text-ink-500">{hint}</span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-2 text-[0.8125rem] font-medium text-flag-700"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
