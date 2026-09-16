/**
 * Jotform delivery for the contact form.
 *
 * The form keeps its own UI and validation; Jotform is only the destination.
 * Both submit paths (the /api/contact proxy on a server host, the direct
 * browser POST on the static export) build their body here, so the field
 * mapping can never drift between them.
 */

/** The form this site submits to. Swap this if the Jotform form is replaced. */
export const JOTFORM_FORM_ID = "262435380475056";

export const JOTFORM_SUBMIT_URL = `https://submit.jotform.com/submit/${JOTFORM_FORM_ID}`;

/**
 * Site key for the hCaptcha field (q9, `control_captcha`) on that form.
 *
 * The key is Jotform's, not ours: Jotform verifies the returned token against
 * its own hCaptcha secret when the submission lands, so there is nothing to
 * configure on our side and nothing secret to keep. It is published in the
 * rendered form's HTML — read a fresh one off `data-sitekey` there if Jotform
 * ever rotates it.
 */
export const JOTFORM_HCAPTCHA_SITEKEY = "772f4a50-7161-425e-8cd5-4d7e361ab765";

export type ContactSubmission = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  /** hCaptcha token for q9. Single-use, and it expires a couple of minutes after it is issued. */
  captchaToken?: string | null;
};

/**
 * Our single "Full name" input against Jotform's first/last pair: the first
 * whitespace-delimited token is the first name, everything after it is the
 * last. A single-word entry leaves the last name empty, which Jotform accepts
 * — neither name part is required on that form.
 */
export function splitName(full: string): { first: string; last: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { first: "", last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

/**
 * The Jotform dropdown's option list is the contract — a value outside it is
 * stored but drops out of Jotform's own reports and filters.
 *
 * TODO: delete this map once the Jotform option is corrected. Its dropdown
 * reads "System & Automation" where the service is actually named "Systems &
 * Automation"; until that is fixed there, we send the spelling Jotform knows.
 */
const SERVICE_ALIASES: Record<string, string> = {
  "Systems & Automation": "System & Automation",
};

/** Our field names → Jotform's question names. */
export function toJotformFields(input: ContactSubmission): Record<string, string> {
  const { first, last } = splitName(input.name ?? "");
  const service = (input.service ?? "").trim();
  const captchaToken = (input.captchaToken ?? "").trim();
  return {
    formID: JOTFORM_FORM_ID,
    simple_spc: `${JOTFORM_FORM_ID}-${JOTFORM_FORM_ID}`,
    "q3_fullName[first]": first,
    "q3_fullName[last]": last,
    q4_company: (input.company ?? "").trim(),
    q5_email: (input.email ?? "").trim(),
    "q6_phoneNumber[full]": (input.phone ?? "").trim(),
    q7_serviceOf: SERVICE_ALIASES[service] ?? service,
    q8_howCan: (input.message ?? "").trim(),
    // q9, the captcha. Two fields, both of which Jotform's own form sends:
    // the token hCaptcha issues, and the hidden input its solve-callback sets
    // to 1 to satisfy the field's `validate[required]`. Sending the flag
    // without a token would only claim a check that never happened, so they
    // travel together.
    "h-captcha-response": captchaToken,
    hcaptcha_visible: captchaToken ? "1" : "",
    // Jotform's own honeypot: it must arrive empty.
    website: "",
  };
}

/** Form-encoded body — the content type Jotform's submit endpoint expects. */
export function toJotformBody(input: ContactSubmission): URLSearchParams {
  return new URLSearchParams(toJotformFields(input));
}
