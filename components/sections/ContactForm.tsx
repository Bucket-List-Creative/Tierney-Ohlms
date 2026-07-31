"use client";

import { useState } from "react";
import { Label, Input, Textarea, Select } from "@/components/primitives/Field";
import { cn } from "@/lib/cn";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "submitting" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact form with inline field validation and a real submission to
 * /api/contact. On success the submit button confirms and resets after 4s.
 */
export function ContactForm({
  serviceOptions,
  embedded = false,
}: {
  serviceOptions: string[];
  embedded?: boolean;
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
    const form = e.currentTarget;
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
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

  const buttonLabel =
    status === "sent"
      ? "Thank you. We'll be in touch shortly"
      : status === "submitting"
        ? "Sending…"
        : "Send Message";

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className={cn(
        "flex flex-col gap-5",
        embedded
          ? "px-10 py-11 max-[767px]:px-6 max-[767px]:py-8"
          : "rounded-card border border-rule bg-white px-10 py-11 shadow-[var(--shadow-rest)] max-[767px]:px-6 max-[767px]:py-8",
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
        <p role="alert" className="m-0 text-sm font-semibold text-ink">
          Something went wrong sending your message. Please try again or email us directly.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting" || status === "sent"}
        aria-live="polite"
        className="btn-grain rounded-btn px-4 py-4 text-[15px] font-semibold disabled:opacity-90"
      >
        {buttonLabel}
      </button>
    </form>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <span id={id} className="text-[13px] font-medium text-ink">
      {children}
    </span>
  );
}
