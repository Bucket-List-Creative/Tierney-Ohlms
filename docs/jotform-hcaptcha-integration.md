# Submitting a custom React form to Jotform when the form requires hCaptcha

A transferable recipe. Written from a working implementation in a Next.js 16
(App Router) + Sanity site, but nothing here is Sanity-specific — it applies to
any React app that keeps its own form UI and uses Jotform only as the
destination.

**The situation this solves:** you have built your own contact form. Jotform
owns the backend. The Jotform form has a **required captcha field**, so every
submission you send is refused — and you cannot tell, because Jotform answers
its own rejection with `HTTP 200` and an HTML page. Submissions look delivered
and silently vanish.

---

## 0. Decide this is actually your problem

Confirm the captcha is required before building anything:

1. Open `https://form.jotform.com/<FORM_ID>` in a browser.
2. View source. Search for `control_captcha` or `h-captcha`.
3. If the field's wrapper carries `validate[required]`, it is mandatory and
   every tokenless submission will be rejected.

If it is *not* required, the cheaper fix is to stop sending the captcha fields
entirely. If it is required and you control the Jotform account, consider
simply turning the captcha off — a honeypot plus server-side validation is
often enough, and it removes this whole layer. Only continue if the captcha has
to stay.

---

## 1. Harvest the four things you need from Jotform

All of these come out of the rendered form's HTML. None are secret.

| What | Where | Example |
|---|---|---|
| Form ID | the URL, and `<input name="formID">` | `262435380475056` |
| Field names | each input's `name` attribute | `q3_fullName[first]`, `q5_email` |
| hCaptcha site key | `data-sitekey` on the captcha div | `772f4a50-…` |
| Dropdown option strings | the `<option>` values | `"Payroll"` |

Two traps worth checking now rather than debugging later:

- **Composite fields.** Jotform splits names and phones: `q3_fullName[first]`
  / `q3_fullName[last]`, `q6_phoneNumber[full]`. A single "Full name" input on
  your side has to be split before sending.
- **Dropdown values are a contract.** A value outside the option list is stored
  but silently drops out of Jotform's own reports and filters. Copy the
  strings exactly, typos included, and map to them.

**The site key is not a secret and needs no environment variable.** It is
Jotform's key, published in their HTML. Jotform holds the matching secret and
verifies the token when the submission lands. Hardcode it next to the form ID
and note where to re-copy it from if Jotform rotates it.

---

## 2. Build one field-mapping module

Both submit paths must produce an identical body, so the mapping lives in
exactly one place.

```ts
// lib/jotform.ts
export const JOTFORM_FORM_ID = "<FORM_ID>";
export const JOTFORM_SUBMIT_URL = `https://submit.jotform.com/submit/${JOTFORM_FORM_ID}`;
export const JOTFORM_HCAPTCHA_SITEKEY = "<SITEKEY>";

export type ContactSubmission = {
  name?: string; company?: string; email?: string;
  phone?: string; service?: string; message?: string;
  /** Single-use; expires a couple of minutes after it is issued. */
  captchaToken?: string | null;
};

export function splitName(full: string) {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return { first: "", last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

export function toJotformFields(input: ContactSubmission): Record<string, string> {
  const { first, last } = splitName(input.name ?? "");
  const captchaToken = (input.captchaToken ?? "").trim();
  return {
    formID: JOTFORM_FORM_ID,
    simple_spc: `${JOTFORM_FORM_ID}-${JOTFORM_FORM_ID}`,
    "q3_fullName[first]": first,
    "q3_fullName[last]": last,
    q5_email: (input.email ?? "").trim(),
    q8_howCan: (input.message ?? "").trim(),
    // ...the rest of your fields

    // The captcha is TWO fields. Jotform's own form sends both.
    "h-captcha-response": captchaToken,
    hcaptcha_visible: captchaToken ? "1" : "",

    // Jotform's honeypot — must arrive empty.
    website: "",
  };
}

export function toJotformBody(input: ContactSubmission) {
  return new URLSearchParams(toJotformFields(input));
}
```

**Why two captcha fields.** `h-captcha-response` is the token hCaptcha issues.
`hcaptcha_visible` is a hidden input that Jotform's own solve-callback sets to
`1` to satisfy the field's `validate[required]`. Sending the flag without a
token would claim a check that never happened, so they must travel together —
derive the flag from the token rather than hardcoding `"1"`.

`simple_spc` is Jotform's anti-spam field and is expected in that exact
`<id>-<id>` shape.

---

## 3. Build the hCaptcha widget component

The two decisions that matter:

**Render explicitly, not via auto-scan.** hCaptcha's `class="h-captcha"`
auto-scan runs once when its script loads. A widget React mounts *after*
hydration is never found. Load with `?render=explicit` and call `render()`
yourself. Explicit render also returns a widget id, which you need in order to
reset a spent token.

**Hold the script promise at module scope.** Otherwise a remount (after a
"Send another message" reset, say) appends a second copy of the script.

```tsx
// components/primitives/HCaptcha.tsx
"use client";
import { useEffect, useRef } from "react";

const SCRIPT_SRC = "https://js.hcaptcha.com/1/api.js?render=explicit";
let scriptPromise: Promise<HCaptchaApi> | null = null;

function loadHCaptcha(): Promise<HCaptchaApi> {
  if (window.hcaptcha) return Promise.resolve(window.hcaptcha);
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT_SRC; s.async = true; s.defer = true;
    s.onload = () => window.hcaptcha
      ? resolve(window.hcaptcha)
      : reject(new Error("hCaptcha loaded without its API"));
    s.onerror = () => { scriptPromise = null; reject(new Error("load failed")); };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export function HCaptcha({ sitekey, onVerify, onUnavailable, resetSignal = 0, className }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  // Callbacks in refs, so a parent passing inline functions does not tear the
  // widget down on every keystroke.
  const onVerifyRef = useRef(onVerify);
  const onUnavailableRef = useRef(onUnavailable);
  useEffect(() => { onVerifyRef.current = onVerify; onUnavailableRef.current = onUnavailable; });

  useEffect(() => {
    let cancelled = false;
    loadHCaptcha().then((api) => {
      if (cancelled || !containerRef.current || widgetIdRef.current !== null) return;
      widgetIdRef.current = api.render(containerRef.current, {
        sitekey,
        // "normal" is 303px wide and overflows narrow panels.
        size: window.matchMedia("(max-width: 359px)").matches ? "compact" : "normal",
        callback: (t: string) => onVerifyRef.current(t),
        "expired-callback": () => onVerifyRef.current(null),
        "chalexpired-callback": () => onVerifyRef.current(null),
        "error-callback": () => onVerifyRef.current(null),
      });
    }).catch(() => { if (!cancelled) onUnavailableRef.current?.(); });

    return () => {
      cancelled = true;
      const id = widgetIdRef.current;
      widgetIdRef.current = null;
      if (id !== null) { try { window.hcaptcha?.remove(id); } catch {} }
    };
  }, [sitekey]);

  useEffect(() => {
    if (resetSignal === 0 || widgetIdRef.current === null) return;
    try { window.hcaptcha?.reset(widgetIdRef.current); onVerifyRef.current(null); } catch {}
  }, [resetSignal]);

  return <div ref={containerRef} className={className} />;
}
```

The component holds **no React state** and never re-renders — the widget owns an
iframe, and everything it has to say it says through callbacks. Report the
token up through `onVerify` rather than reading the textareas hCaptcha injects,
so the component works inside a form that serialises itself by hand.

`onUnavailable` is not optional polish. If hCaptcha is blocked — a privacy
extension, a corporate network, a region that blocks it — the visitor can never
submit. The form must say so and offer a phone number or email instead.

---

## 4. Wire it into the form

```tsx
const [captchaToken, setCaptchaToken] = useState<string | null>(null);
const [captchaBroken, setCaptchaBroken] = useState(false);
const [captchaResets, setCaptchaResets] = useState(0);
const captchaRef = useRef<HTMLDivElement>(null);
```

Four things to get right:

**Validate before submitting.** Block on a missing token client-side, with a
different message when the widget failed to load — "confirm you are not a
robot" is useless advice if there is no widget to click.

**Reset after every attempt, success or failure.** Tokens are single-use and
expire within minutes. Without a reset, a retry is refused for a stale token
and the visitor has no idea why.

```ts
setCaptchaToken(null);
setCaptchaResets((n) => n + 1);
```

**Strip hCaptcha's injected textareas** if you serialise the form with
`FormData`. The script writes `h-captcha-response` and `g-recaptcha-response`
into whatever `<form>` it sits in; you are passing the token explicitly, so
drop them rather than shipping the same value twice.

```ts
delete payload["h-captcha-response"];
delete payload["g-recaptcha-response"];
```

**Accessibility.** The widget is an iframe, not a field of yours, so it carries
no `aria-invalid` and focus management skips it. Give the wrapper `tabIndex={-1}`
and focus it explicitly when the captcha is the only outstanding error. Label it
with a heading rather than a `<label>` — there is no form control to point at.

---

## 5. The server route

```ts
const captchaToken = String(body.captchaToken ?? "").trim();
if (!captchaToken) {
  return NextResponse.json({ error: "Verification required." }, { status: 422 });
}
```

**Do not verify the token yourself.** Jotform holds the hCaptcha secret, and
verifying consumes the token — checking it first means Jotform's own check then
fails. Your job is only to refuse an obviously tokenless submission *before* it
reaches Jotform, so the browser gets a truthful answer instead of Jotform's
`200`-that-means-rejected.

Post form-encoded, and read the result carefully:

```ts
const res = await fetch(JOTFORM_SUBMIT_URL, {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: toJotformBody({ ...fields, captchaToken }),
  redirect: "manual",   // the redirect IS the success signal — don't follow it
  cache: "no-store",
});
const delivered = res.ok || res.status === 0 || (res.status >= 300 && res.status < 400);
```

---

## 6. If you also ship a static export

With `output: export` there are no API routes, so the browser posts straight to
Jotform. Same body builder, different transport — which is exactly why step 2
is a shared module. The direct path cannot read the response (opaque CORS), so
treat a completed request as success.

---

## Gotchas, ranked by how long they cost to find

1. **Jotform returns `200` when it rejects you.** Its rejection is an HTML
   page, not a status code. Never treat `200` alone as delivery.
2. **Auto-scan won't find a React-mounted widget.** Use `render=explicit`.
3. **Tokens are single-use and short-lived.** Reset after every attempt.
4. **`hcaptcha_visible` must be derived from the token**, never hardcoded.
5. **Dropdown values must match Jotform's option strings exactly** — including
   any typo in their option list. Map around it and leave a TODO rather than
   sending a "correct" value that vanishes from their reports.
6. **Composite fields** need the bracket syntax: `q3_fullName[first]`.
7. **A blocked hCaptcha is an unreachable form.** Always provide a fallback
   contact route.

---

## Privacy note

hCaptcha is a third-party processor that receives the visitor's IP address and
sets its own cookies. If the site has a privacy policy, it needs a line saying
so — it is a new data flow, not just a UI widget.
