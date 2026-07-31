import { NextResponse } from "next/server";

/**
 * Contact form endpoint. This is a working stub: it validates the payload and
 * returns success. Wire the TODO below to your email/CRM provider (Resend,
 * SendGrid, HubSpot, a Sanity `submission` document, etc.) before launch.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 422 },
    );
  }

  // TODO: deliver the message (email / CRM / Sanity). For now, log server-side.
  console.info("[contact] new submission", {
    name,
    email,
    company: body.company,
    phone: body.phone,
    service: body.service,
  });

  return NextResponse.json({ ok: true });
}
