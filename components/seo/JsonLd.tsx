/**
 * Renders a JSON-LD block into the server-rendered HTML.
 *
 * Server-rendered on purpose: client-injected structured data is less reliably
 * picked up by crawlers, and every page here is already server-rendered.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from CMS data in lib/seo/schema.ts, never from
      // user input. JSON.stringify escaping is sufficient here; the `<` guard
      // prevents a stray "</script>" in copy from closing the tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
