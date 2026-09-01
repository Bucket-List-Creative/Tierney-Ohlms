import { NextResponse } from "next/server";
import { JOTFORM_SUBMIT_URL, toJotformBody } from "@/lib/jotform";

/**
 * Contact form endpoint — validates the payload and forwards it to Jotform.
 *
 * Server-to-server, so there is no CORS limit and the real status comes back:
 * the browser learns whether the submission actually landed. The static-export
 * build has no API routes, so there the form POSTs to Jotform directly (see
 * components/sections/ContactForm.tsx).
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: a bot filled the field no human can see. Accept and drop.
  if (String(body.website ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 422 });
  }

  try {
    const res = await fetch(JOTFORM_SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: toJotformBody({
        name,
        email,
        message,
        company: String(body.company ?? ""),
        phone: String(body.phone ?? ""),
        service: String(body.service ?? ""),
      }),
      // Jotform answers a submission with a redirect to its thank-you page;
      // reaching that redirect is the success signal, so don't follow it.
      redirect: "manual",
      cache: "no-store",
    });

    // 2xx, or the opaque redirect Jotform issues on a successful submission.
    const delivered = res.ok || res.status === 0 || (res.status >= 300 && res.status < 400);
    if (!delivered) {
      console.error("[contact] Jotform rejected the submission", res.status);
      return NextResponse.json({ error: "Delivery failed." }, { status: 502 });
    }
  } catch (err) {
    console.error("[contact] could not reach Jotform", err);
    return NextResponse.json({ error: "Delivery failed." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
