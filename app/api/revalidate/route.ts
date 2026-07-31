import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

/**
 * Sanity webhook target. Configure a webhook in manage.sanity.io that POSTs on
 * publish to:  /api/revalidate?secret=YOUR_SECRET
 * with a projection body of:  { "_type": _type }
 *
 * On a valid request this busts the Next cache tag matching the document type
 * (see lib/sanity/fetch.ts CACHE_TAGS), so published edits appear immediately.
 */
export async function POST(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");
  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  let body: { _type?: string };
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const type = body._type;
  if (!type) {
    return NextResponse.json({ error: "Missing _type in payload" }, { status: 400 });
  }

  // Next 16 requires a cache profile as the second argument; "max" expires now.
  revalidateTag(type, "max");
  return NextResponse.json({ revalidated: true, tag: type });
}
