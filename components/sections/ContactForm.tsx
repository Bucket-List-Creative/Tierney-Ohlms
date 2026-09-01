"use client";

import { useEffect, useRef, useState } from "react";
import { Label, Input, Textarea, Select } from "@/components/primitives/Field";
import { Button } from "@/components/primitives/Button";
import { IconTile } from "@/components/primitives/IconTile";
import { LineIcon } from "@/components/icons/LineIcon";
import { JOTFORM_SUBMIT_URL, toJotformBody } from "@/lib/jotform";
import { cn } from "@/lib/cn";
import type { SiteSettings } from "@/lib/types";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "submitting" | "sent" | "error";

/** Everything the form needs from site settings, for the confirmation panel. */
export type ContactDetails = Pick<
  SiteSettings,
  "phone" | "phoneHref" | "email" | "addressLine1" | "addressLine2" | "hours"
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** In static-export builds (GitHub Pages) there is no /api route to POST to. */
const STATIC_EXPORT = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

/**
 * Contact form with inline field validation. Submissions go to Jotform:
 * normally through /api/contact, which forwards them server-side and reports
 * the real result; in a static-export build there is no API route, so the
 * browser POSTs to Jotform directly.
 *
 * On success the fields give way to a confirmation panel in the same shell —
 * it says what happens next and offers the direct lines for anyone who does
 * not want to wait. It holds until the visitor dismisses it.
 */
export function ContactForm({
  serviceOptions,
  site,
  embedded = false,
}: {
  serviceOptions: string[];
  site: ContactDetails;
  embedded?: boolean;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const confirmationRef = useRef<HTMLDivElement>(null);

  const sent = status === "sent";

  // Move the reading position to the confirmation, so keyboard and screen
  // reader users land on it rather than wherever the submit button was.
  useEffect(() => {
    if (sent) confirmationRef.current?.focus();
  }, [sent]);

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
    if (status === "submitting") return;
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

    // Honeypot: only a bot fills a field it cannot see. Show the same
    // confirmation a human gets, and send nothing.
    if (payload.website?.trim()) {
      setStatus("sent");
      return;
    }

    setStatus("submitting");
    try {
      if (STATIC_EXPORT) {
        // Static host (GitHub Pages): no API route to proxy through, so post
        // straight to Jotform. `no-cors` is the only way a browser may post
        // cross-origin here; the response is opaque, so a Jotform-side
        // rejection cannot be detected — only a network failure can.
        await fetch(JOTFORM_SUBMIT_URL, {
          method: "POST",
          mode: "no-cors",
          body: toJotformBody(payload),
        });
      } else {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Request failed");
      }
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const shell = cn(
    "relative",
    embedded
      ? "px-10 py-11 max-[767px]:px-6 max-[767px]:py-8"
      : "rounded-panel border border-rule bg-white px-10 py-11 shadow-[var(--shadow-rest)] max-[767px]:px-6 max-[767px]:py-8",
  );

  if (sent) {
    return (
      <div
        ref={confirmationRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={cn(shell, "flex flex-col items-center gap-7 text-center outline-none")}
        style={{ animation: "field-error-in 420ms cubic-bezier(0.16,1,0.3,1)" }}
      >
        <span
          aria-hidden
          className="aura-light grid h-16 w-16 place-items-center rounded-full border border-gold/55 text-brass shadow-[var(--glow-gold)]"
        >
          <LineIcon name="check" size={26} />
        </span>

        <div className="flex flex-col gap-3">
          <h3 className="m-0 font-display text-[clamp(23px,2.4vw,30px)] font-medium leading-[1.15] text-ink">
            Thank you — your message is <em className="gradient-text">on its way.</em>
          </h3>
          <p className="m-0 max-w-[46ch] text-[15px] leading-relaxed text-slate">
            A real person reads every message. Expect a reply within one business day.
            If it&rsquo;s urgent, reach us directly.
          </p>
        </div>

        <span aria-hidden className="rule-fade block h-px w-full" />

        <div className="flex flex-wrap justify-center gap-3">
          <Button href={site.phoneHref} variant="primary" size="sm">
            <LineIcon name="phone" size={15} />
            Call {site.phone}
          </Button>
          <Button href={`mailto:${site.email}`} variant="secondary" size="sm">
            <LineIcon name="mail" size={15} />
            {site.email}
          </Button>
        </div>

        <div className="flex w-full flex-col gap-2.5 text-left">
          <ContactRow icon="location" label="Visit us">
            {site.addressLine1}
            {site.addressLine2 ? `, ${site.addressLine2}` : ""}
          </ContactRow>
          {site.hours ? (
            <ContactRow icon="clock" label="Office hours">
              {site.hours}
            </ContactRow>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => {
            setErrors({});
            setStatus("idle");
          }}
          className="link-line text-[13px] font-semibold uppercase tracking-[.08em] text-brass transition-colors duration-300 hover:text-ink"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className={cn(shell, "flex flex-col gap-5")}>
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

      {/* Jotform's honeypot. Hidden from sight and from assistive tech, and
          left out of the tab order — anything that fills it is a bot. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-px w-px opacity-0"
      />

      {status === "error" ? (
        <p
          role="alert"
          className="m-0 flex items-start gap-2 rounded-input border border-rule bg-goldwash/60 px-3.5 py-3 text-sm font-medium text-ink"
        >
          <LineIcon name="alert" size={16} className="mt-0.5 shrink-0 text-brass" />
          <span>
            Something went wrong sending your message. Please try again, or reach us
            directly on{" "}
            <a href={site.phoneHref} className="link-line font-semibold">
              {site.phone}
            </a>{" "}
            or{" "}
            <a href={`mailto:${site.email}`} className="link-line font-semibold">
              {site.email}
            </a>
            .
          </span>
        </p>
      ) : null}

      <Button type="submit" loading={status === "submitting"} className="w-full">
        Send Message
        <LineIcon
          name="arrow-right"
          size={17}
          className="transition-transform duration-300 group-hover/btn:translate-x-1"
        />
      </Button>

      {/* Status for assistive tech, mirrored out of the visual button state. */}
      <span role="status" aria-live="polite" className="sr-only">
        {status === "submitting" ? "Sending your message" : ""}
      </span>
    </form>
  );
}

/** One direct-contact line in the confirmation panel. */
function ContactRow({
  icon,
  label,
  children,
}: {
  icon: "location" | "clock";
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group flex items-center gap-3.5 border-t border-rule py-3">
      <IconTile icon={icon} tile={38} size={16} />
      <span className="flex min-w-0 flex-col">
        <span className="font-mono text-[10px] uppercase tracking-[.14em] text-dark-label">
          {label}
        </span>
        <span className="text-[14px] leading-snug text-ink">{children}</span>
      </span>
    </div>
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
