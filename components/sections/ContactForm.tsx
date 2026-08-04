"use client";

import { useState } from "react";
import { Label, Input, Textarea, Select } from "@/components/primitives/Field";
import { Button } from "@/components/primitives/Button";
import { LineIcon } from "@/components/icons/LineIcon";
import { cn } from "@/lib/cn";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "submitting" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** In static-export builds (GitHub Pages) there is no /api route to POST to. */
const STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

/**
 * Contact form with inline field validation. Normally POSTs to /api/contact;
 * in a static-export build it falls back to opening a pre-filled mailto so the
 * form still works on a server-less host. On success the submit button confirms
 * and resets after 4s.
 */
export function ContactForm({
  serviceOptions,
  embedded = false,
  contactEmail = "info@tierneyohlms.com",
}: {
  serviceOptions: string[];
  embedded?: boolean;
  contactEmail?: string;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form);
    const next: Errors = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Please enter your name.";
    const email = String(data.get("email") ?? "").trim();
    if (!email) next.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email)) next.email = "Please enter a valid email address.";
    if (!String(data.get("message") ?? "").trim())
      next.message = "Please tell us a little about what you need.";
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting" || status === "sent") return;
    const form = e.currentTarget;
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;

    // Static host (GitHub Pages): no server endpoint, so hand off to the user's
    // mail client with the message pre-filled.
    if (STATIC_EXPORT) {
      const subject = `Website inquiry from ${payload.name ?? ""}`.trim();
      const body = [
        `Name: ${payload.name ?? ""}`,
        `Company: ${payload.company ?? ""}`,
        `Email: ${payload.email ?? ""}`,
        `Phone: ${payload.phone ?? ""}`,
        `Service: ${payload.service ?? ""}`,
        "",
        payload.message ?? "",
      ].join("\n");
      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      form.reset();
      window.setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
      window.setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
    }
  }

  const sent = status === "sent";

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className={cn(
        "relative flex flex-col gap-5",
        embedded
          ? "px-10 py-11 max-[767px]:px-6 max-[767px]:py-8"
          : "rounded-panel border border-rule bg-white px-10 py-11 shadow-[var(--shadow-rest)] max-[767px]:px-6 max-[767px]:py-8",
      )}
    >
      <div className="grid grid-cols-2 gap-4 max-[500px]:grid-cols-1">
        <Label htmlFor="name">
          Full name
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Jane Smith"
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "err-name" : undefined}
            className={cn(errors.name && "border-ink")}
          />
          {errors.name ? <FieldError id="err-name">{errors.name}</FieldError> : null}
        </Label>
        <Label htmlFor="company">
          Company
          <Input
            id="company"
            name="company"
            type="text"
            placeholder="Your company"
            autoComplete="organization"
          />
        </Label>
      </div>

      <div className="grid grid-cols-2 gap-4 max-[500px]:grid-cols-1">
        <Label htmlFor="email">
          Email
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "err-email" : undefined}
            className={cn(errors.email && "border-ink")}
          />
          {errors.email ? <FieldError id="err-email">{errors.email}</FieldError> : null}
        </Label>
        <Label htmlFor="phone">
          Phone
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(314) 555-0100"
            autoComplete="tel"
          />
        </Label>
      </div>

      <Label htmlFor="service">
        Service of interest
        <Select id="service" name="service" defaultValue={serviceOptions[0]}>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </Select>
      </Label>

      <Label htmlFor="message">
        How can we help?
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us a bit about your business and what you're looking for."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "err-message" : undefined}
          className={cn(errors.message && "border-ink")}
        />
        {errors.message ? <FieldError id="err-message">{errors.message}</FieldError> : null}
      </Label>

      {status === "error" ? (
        <p
          role="alert"
          className="m-0 flex items-start gap-2 rounded-input border border-rule bg-goldwash/60 px-3.5 py-3 text-sm font-medium text-ink"
        >
          <LineIcon name="alert" size={16} className="mt-0.5 shrink-0 text-brass" />
          Something went wrong sending your message. Please try again or email us directly.
        </p>
      ) : null}

      {/* While `sent`, the button reads as a confirmation rather than a
          disabled control — `disabled` would grey out the very message we
          want to celebrate — so it's inert via aria + pointer-events, and
          onSubmit refuses a repeat send. */}
      <Button
        type="submit"
        loading={status === "submitting"}
        aria-disabled={sent || undefined}
        className={cn("w-full", sent && "pointer-events-none")}
      >
        {sent ? (
          <>
            {/* The tick draws itself once, then the label follows. */}
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15">
              <LineIcon name="check" size={13} className="text-white" />
            </span>
            Thank you — we&rsquo;ll be in touch shortly
          </>
        ) : (
          <>
            Send Message
            <LineIcon
              name="arrow-right"
              size={17}
              className="transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </>
        )}
      </Button>

      {/* Status for assistive tech, mirrored out of the visual button state. */}
      <span role="status" aria-live="polite" className="sr-only">
        {status === "submitting"
          ? "Sending your message"
          : sent
            ? "Message sent. We'll be in touch shortly."
            : ""}
      </span>
    </form>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <span
      id={id}
      className="flex items-center gap-1.5 text-[13px] font-medium text-ink"
      style={{ animation: "field-error-in 320ms cubic-bezier(0.16,1,0.3,1)" }}
    >
      <LineIcon name="alert" size={13} className="shrink-0 text-brass" />
      {children}
    </span>
  );
}
