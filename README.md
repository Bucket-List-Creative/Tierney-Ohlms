# Tierney & Ohlms — Website

Marketing site for Tierney & Ohlms, built to the design handoff (the `Tierney & Ohlms Home.dc.html` and `Brand Guide.dc.html` references in the parent folder).

**Stack:** Next.js 16 (App Router, RSC) · TypeScript · Tailwind CSS v4 · Sanity v6 (embedded Studio at `/studio`) · self-hosted fonts via `next/font`.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in your Sanity values (see below)
npm run dev                  # http://localhost:3000
```

The site runs immediately **with no Sanity credentials** — it renders from a
local content mirror (`lib/content`). Add Sanity values to switch to live CMS
data. Nothing else is required to see the full, styled homepage.

---

## Connecting Sanity

1. Create a project (once):

   ```bash
   npm create sanity@latest -- --project-plan free --create-project "Tierney & Ohlms" --dataset production
   ```

   or grab an existing **Project ID** from <https://manage.sanity.io>.

2. Put your values in `.env.local`:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
   NEXT_PUBLIC_SANITY_DATASET="production"
   NEXT_PUBLIC_SANITY_API_VERSION="2025-01-01"
   SANITY_API_READ_TOKEN="a_viewer_token"      # manage.sanity.io → API → Tokens
   SANITY_REVALIDATE_SECRET="a_long_random_string"
   ```

3. Seed the content (mirrors `lib/content`):

   ```bash
   SANITY_API_WRITE_TOKEN=sk... npm run sanity:push     # add --dry-run first to check
   ```

   `sanity:push` `createOrReplace`s every document in `scripts/seed.ndjson` by
   its stable `_id` over the HTTP mutation API. It is idempotent and additive:
   re-running it updates the documents this repo owns and leaves everything else
   in the dataset (uploaded images, editor-authored pages) alone. The token needs
   **Editor** rights — the read token in `.env.local` cannot mutate.

   `npm run seed` is the older `sanity dataset import ... --replace` path; it
   wipes the dataset first, so only use it on an empty or throwaway dataset.

4. Add `http://localhost:3000` and your production origin under
   **CORS origins** in the Sanity project API settings, then restart `npm run dev`.
   Edit content at <http://localhost:3000/studio>.

Once `NEXT_PUBLIC_SANITY_PROJECT_ID` is set, all content comes from Sanity via
GROQ (`lib/data.ts`), with the local mirror used only as a per-field safety net
so a not-yet-seeded document never blanks the page.

---

## Instant publishing (revalidation webhook)

In **manage.sanity.io → API → Webhooks**, add a webhook:

- **URL:** `https://YOUR_DOMAIN/api/revalidate?secret=YOUR_SANITY_REVALIDATE_SECRET`
- **Trigger:** on create / update / delete
- **Projection:** `{ "_type": _type }`

On publish, the matching Next cache tag (see `lib/sanity/fetch.ts`) is busted and
the change appears without a redeploy.

---

## Contact form → Jotform

The form keeps its own UI and validation; Jotform is only the destination. The
field mapping lives in **`lib/jotform.ts`** — change `JOTFORM_FORM_ID` there if
the Jotform form is ever replaced.

| Form field | Jotform question |
| --- | --- |
| `name` | `q3_fullName[first]` + `q3_fullName[last]` (split on the first space) |
| `company` | `q4_company` |
| `email` | `q5_email` |
| `phone` | `q6_phoneNumber[full]` |
| `service` | `q7_serviceOf` |
| `message` | `q8_howCan` |

Two delivery paths share that mapping:

- **Server hosts (Vercel):** the browser POSTs JSON to `/api/contact`, which
  forwards it to Jotform server-to-server. No CORS limit, so a failed delivery
  comes back as a real error and the form says so.
- **Static export (GitHub Pages):** there is no API route, so the browser POSTs
  to Jotform directly with `mode: "no-cors"`. The response is opaque, so only a
  network failure can be detected — a Jotform-side rejection cannot be.

A hidden `website` honeypot is checked on both paths: a filled one gets the same
confirmation a human sees, and nothing is sent.

---

## Project structure

```
app/
  (site)/layout.tsx        fonts + header + footer + skip link
  (site)/page.tsx          homepage — composes the section components
  (site)/services/        the service ladder + a page per service ([slug])
  (site)/about/           Our Story
  (site)/[slug]/page.tsx   generic Sanity pages
  not-found.tsx            404 (dark aura surface)
  studio/[[...tool]]/      embedded Sanity Studio
  api/contact/             contact form → Jotform (see lib/jotform.ts)
  api/revalidate/          Sanity webhook → revalidateTag
  globals.css              Tailwind theme: all design tokens + grain/aura
components/
  primitives/              Button, Card, Field, Badge, Alert, Accordion, IconTile, MediaFrame, EmptyState
  sections/                Hero, TrustBar, Services, WhyUs, Industries, Process, Testimonials, CtaBanner, Contact
  layout/                  Header (condense-on-scroll + mobile sheet), Footer, Section
  icons/                   registry.tsx (typed 1.5px line icons) + LineIcon
lib/
  data.ts                  single content entry point (Sanity ↔ local fallback)
  sanity/                  env, client, image, queries, fetch
  content/                 local seed mirror (typed)
  types.ts                 shared content types
  tokens.ts                JS mirror of the Tailwind theme
sanity/
  schemaTypes/             objects + singletons + collections
  structure.ts             Studio desk (singletons + orderable lists)
scripts/seed.ndjson        importable placeholder dataset
```

## Scripts

| command | what it does |
| --- | --- |
| `npm run dev` | dev server |
| `npm run build` | production build |
| `npm run start` | serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (flat config) |
| `npm run sanity:push` | `createOrReplace` every doc in `scripts/seed.ndjson` into the dataset (needs `SANITY_API_WRITE_TOKEN`) |
| `npm run sanity:push:dry` | the same, as a Sanity dry run — validates without writing |
| `npm run seed` | legacy full-dataset import (`--replace`, **wipes the dataset**) |

---

## Design-system notes (decisions worth knowing)

- **Tokens live once** in `app/globals.css` (`@theme`) and are referenced via
  Tailwind utilities — no arbitrary color/spacing values in components.
- **Gold vs brass:** `#C9A227` (gold) is used only for rules, washes, and
  dividers. All gold-colored *text* (eyebrows, the process index, feature
  hairlines-as-text) uses the text-safe **brass** `#8C6E1F`. Where the homepage
  prototype showed gold text, the brand guide wins.
- **Inputs use a 6px radius** (brand guide), not the 10px the homepage prototype
  showed — as called out in the handoff.
- **Grain & Aura** is a set of reusable classes (`.surface-dark`, `.aura-hero`,
  `.aura-light`, `.btn-grain`). One aura per viewport; the dark signature surface
  appears only on the hero-adjacent CTA banner and the 404.
- **Icons** are a typed registry (`components/icons/registry.tsx`); Sanity `icon`
  fields are enum strings resolved against it, so stroke weight stays consistent.
- Respects `prefers-reduced-motion`; visible focus rings; one `<h1>` per page;
  semantic landmarks; skip-to-content link.

## Still to do before launch (from the handoff)

- Replace **placeholder copy**: phone `(314) 555-0100`, email, address, the four
  statistics, both testimonials, and service descriptions — confirm with the client.
- Supply the **official logo SVG** (black + white) to replace the Playfair wordmark.
- Add **real photography** for the hero + a map embed URL (`siteSettings.mapEmbedUrl`).
- Optional: enable Sanity **Presentation / visual editing** (stega is already on the
  client) and add draft-mode routes.

## Deploy (Vercel)

Push to a Git repo, import in Vercel, set the same env vars, and add the
revalidation webhook above. ISR + tag revalidation are already wired.
