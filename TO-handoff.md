# Tierney & Ohlms Website — Build Handoff

Paste-in / attach this file at the start of the new Cowork task (run **on this
computer**, mac-studio-lan) so the session has the full plan, decisions, and all
client-provided content. The T&O repo folder should be attached to that task.

---

## Project context

- Next.js (App Router) + Sanity CMS site. Sanity is **live** (dataset `tierney-ohlms`).
- Architecture: content is defined in Sanity schemas (`sanity/schemaTypes/`),
  pulled via GROQ in `lib/sanity/queries.ts`, typed in `lib/types.ts`, with a
  **local fallback** in `lib/content/index.ts` that renders per-field even before
  a Sanity document exists. Data loaders live in `lib/data.ts`. Pages under
  `app/(site)/` read that data and render section components from `components/`.
- Existing content types: singletons `siteSettings`, `navigation`, `homePage`;
  collections `service`, `feature`, `processStep`, `highlight`, `stat`, `faq`,
  `page`; objects `linkItem`, `cta`, `sectionHeader`, `seo`, `footerColumn`.
- Reusable UI: `components/layout/Section.tsx` (with `Orb`), `components/sections/
  SectionHeader.tsx`, `components/primitives/` (Button, MediaFrame, Reveal, IconTile…),
  `components/motion/` (TextReveal, FadeIn, Magnetic, Parallax, Spotlight),
  `components/icons/` (LineIcon + registry). The hand-built `app/(site)/services/
  page.tsx` is the best reference for a rich content page.

## Working style

Step by step, teaching-focused: **assistant instructs what to add and where; the
user makes the edit; assistant reviews the file back before moving on.** Do not
bulk-edit for the user unless asked.

## Decisions locked

- Build order: **Our Story page first**, then Private Equity tab, then Client Stories.
- Full Sanity path for all content (schema → query → type → fallback → page).
- Our Story lives at route **`/about`**, nav label **"Our Story"**.
- Weave both origin framings: the **side-hustle** origin leads in "The Story"; the
  **barrel-company** story is its own later section ("The First Client").
- Private Equity will get its **own route `/services/private-equity`** (later).
- Client Stories will be a **repeatable Sanity collection** (like `service`) (later).

## Our Story — 8-step plan and status

1. **Content model** — `founder` object + `aboutPage` singleton, registered in
   `schemaTypes/index.ts` and `structure.ts`. → **DONE, reviewed.**
2. Types: `Founder` + `AboutPage` in `lib/types.ts`. → **DONE.**
3. Query + loader: `aboutPageQuery` in `queries.ts`, `aboutPage` cache tag in
   `lib/sanity/fetch.ts`, `getAboutPage()` in `data.ts` (per-section fallback). → **DONE.**
4. Local fallback copy in `lib/content/index.ts` (`export const aboutPage`). → **DONE.**
5. Page component + `/about` route: `app/(site)/about/page.tsx`. → **DONE.**
6. "Our Story" nav link — added to the local `navigation` fallback and the footer
   "Company" column. → **DONE locally. STILL TO DO in Sanity** (see below).
7. Founder family photos (Paul & Dan) — **NOT DONE.** Both founders currently
   render `photo: null`, so the card shows a "photo coming soon" placeholder frame.
8. Verify: `tsc --noEmit` clean, `eslint` clean, `next build` clean with `/about`
   prerendered, page visually reviewed end to end. → **DONE.**

### Known state / gotchas

- **The Sanity dataset is empty.** No `siteSettings`, `navigation`, `homePage`, or
  `aboutPage` documents exist yet, and `scripts/seed.ndjson` has not been imported.
  Credentials ARE set, so every loader queries Sanity, gets `null`, and falls
  through to `lib/content/index.ts`. The whole site renders from local fallback today.
  The moment a `navigation` document is published, the "Our Story" link must be added
  there too or it will disappear from the header.
- **`next build` will not run in the Cowork device VM** (Linux arm64, no network,
  macOS SWC binary in `node_modules`). Run it natively on the Mac, or in the cloud
  container after a fresh `npm ci`. `tsc --noEmit` and `eslint` run fine anywhere.
- Do NOT verify with `NEXT_PUBLIC_STATIC_EXPORT=true`: the `/[slug]` route fails
  static export with "missing generateStaticParams()". Pre-existing, unrelated to
  Our Story, but it will need fixing before the GitHub Pages deploy works.
- `_to_delete/to-src.tgz` at the repo root is a scratch tarball from the build
  verification. Safe to delete.

**Next action:** Step 7 (drop Paul's and Dan's family photos into the founder cards),
then the Private Equity route `/services/private-equity`, then Client Stories.
Dan's "Outside work" paragraph is still outstanding from the client.

---

# CLIENT-PROVIDED CONTENT (verbatim)

## 1) Our Story page

### THE STORY
Six years ago, Dan and I started this business as a side hustle. We were doing the
books for a few companies on nights and weekends, and we kept seeing the same thing:
sharp owners building real businesses, flying half-blind because nobody was giving
them real financial help. The big firms were chasing bigger clients. The local shops
were stuck in 1995. So the owner carried it all.

At some point we thought, why not just build the firm these businesses deserve? So we did.

Aptly named by two creative CPAs, Tierney & Ohlms is a complete, modern accounting
team. You get what the big guys get: accurate books, 24-hour responses, a close that
is actually on time, controller-level controls, and CPA-prepared financials, all on
modern tools, all for one flat monthly fee. No bloat. No surprise invoices. Real CPAs
reviewing the work and the processes that keep your business running.

The goal is simple: give every business, big or small, the financial clarity the big
guys take for granted. What started on nights and weekends is now a full team, working
with clients in St. Louis and across the country. Reach out if you are facing a similar
problem, or just want some time back to grow your business.

### ROOTED IN ST. LOUIS
Tierney & Ohlms is a St. Louis firm through and through. Paul was born and raised in
O'Fallon, MO, went to school here, and still has most of his family in the St. Louis
metro. Both founders are raising their families in the area, so the businesses they
serve are quite literally their neighbors.

St. Louis is a small town, and reputation matters. The firm gives every client, no
matter their size, the same high level of service, and most of its growth has come
through referrals from existing clients, one trusted introduction at a time. Fittingly,
the very first client came through a referral too.

Pull quote / callout: "Big firms save their best service for their biggest clients.
We give every client, whatever their size, the same attention. In a town this small,
that is the only reputation worth having."

### FOUNDERS

**Paul Ohlms, CPA, Co-founder** (UPDATED BIO — use this version)
Before starting the firm, Paul spent his career at JPMorgan and Ernst & Young. During
that period, he saw that smaller businesses were behind on technology, understaffed,
and underserved, so he set out to build a team that brought real focus and work ethic
to that market, the kind of service even businesses with smaller balance sheets could
count on. He leads the operational accounting side and cares most about the direct
impact of the work: at this level, the numbers change what the owner takes home, who
they hire, and how fast the company grows.
Outside work: born and raised in O'Fallon, MO, with most of his family still in the
St. Louis metro. He and his wife are raising their son Bennett in St. Louis, and he
loves to travel, visit the Botanical Garden, cheer on the Mizzou Tigers and golf when
time allows.

**Dan Tierney, CPA, Co-founder**
Dan is a CPA who had talked with Paul for years about building a firm dedicated to
small businesses. A conversation with a local banker reinforced what they already
believed: St. Louis small businesses needed more support, and affordable, modern
solutions existed to give it to them. Dan loves getting to know clients, understanding
their challenges, and making accounting a valuable part of the business rather than a
burden, clear financial insight and efficient processes that help owners make better
decisions, save time, and grow.
Outside work: **DAN TO UPDATE AND SEND** — placeholder, leave blank / "coming soon"
until Dan sends his personal paragraph.

Photos: two pictures of Dan and Paul with their respective families were provided in
the app (family photos, meant to "soften up" the site). These go on the founder cards.

### WHAT WE PROMISE
- A response within 24 hours.
- Staying ahead of the curve on industry changes, we demo and investigate treasury
  solutions, ERPs, and automation and process tools for accounting departments.
- Private, data-safe AI with a CPA reviewing every output (client financials are never
  used to train models).

### THE FIRST CLIENT
Our first non-family client was a barrel company that needed financials a bank would
trust to approve a loan. Their legacy firm was mostly tax preparers doing some
accounting on the side, so the books were behind and not something a lender would
accept. A local banker introduced us, and from the moment we met them the need was
obvious. We cleaned up the prior financials, built out a full accounting process, and
set a real close timeline. That experience validated the vision and became the
foundation of the firm.

---

## 2) Private Equity Owned Businesses — tab (sub-tab under Services; route /services/private-equity)

Audience: private equity sponsors and their portfolio companies, lower-middle-market,
roughly $2 to 10M EBITDA.

**Suggested headline:** Your portfolio companies don't know what they don't know.

**Intro:** Operators think the back office is handled. It usually isn't: weak controls,
manual AP/AR, an unreliable close, and no real systems. Those gaps quietly cost EBITDA
and create risk you can't see from the board deck. Tierney & Ohlms finds them, fixes
them, and runs a real, automated accounting function, so your companies, and your
returns, aren't exposed.

**Pull quote / callout:** We are not bookkeepers. This is operational accounting:
controls, systems, automation, and a managed team that closes the gaps a bookkeeper
never will.

**What we do**
- Full accounting and financial review. We assess systems, controls, AP/AR, and bank
  and balance-sheet reconciliations, and surface the serious deficiencies most operators
  can't see.
- Build the fix. We design and stand up modern, automated processes around what we find.
- Run it. Our team can manage your accounting ongoing, with reporting you and your
  operators can actually trust.
- Uplevel your existing team. Routine daily accounting comes off your staff's plate, so
  your people spend fewer hours on the grind and more on work that grows the business.
- Scaled to the company. A full review for lower-LMM companies, or a focused AP/AR
  review where that is the priority.

**The gaps we close**
- Weak or undocumented controls, with fraud and duplicate-payment exposure.
- Manual, error-prone AP and AR.
- A slow, unreliable monthly close and reporting you can't make decisions on.
- No real systems or automation, everything living in one person's head.

**Why Tierney & Ohlms**
- Modern, AI-enabled process, run by real CPAs. Licensed accountants using today's
  tools, private by design, never training on your portfolio's data.
- We build and run it, not just flag it. We clean up the books, stand up an automated
  accounting function, and operate it ongoing.
- Flat monthly fee, controller-level rigor. Real oversight without a full-time hire,
  and no surprise invoices.

**Proof (from a recent engagement)**
- $200K+ in fraud exposure closed.
- $79K per month in card spend brought under control.
- 8 control gaps fixed.

**How we work with sponsors**
Refer a portfolio company. We run the review, deliver the analysis and a plan, then
build and run the accounting function ongoing. One point of contact, reporting you can
trust, and a team that treats your portfolio's numbers like your returns depend on
them, because they do.

---

## 3) Client Stories — case studies (repeatable Sanity collection later)

Clients described generically; real names swapped in where approved. Software tools
(Ramp, ServiceTitan, NetSuite, QuickBooks) named to show the work.

**Bank reconciliation — multi-location dental group**
A multi-location dental group came to us with a bank reconciliation that never quite
tied out. Patient and card payments flowed through the point-of-sale system into the
bank, but deposits sat in undeposited funds, processor fees muddied the numbers, and
every office handled it a little differently. Each month-end turned into a hunt for
what matched and what didn't.
We rebuilt the reconciliation from the ground up: matched daily POS batches to bank
deposits, cleared the backlog in undeposited funds, booked processor fees and
chargebacks correctly, and mapped every office's deposits to the right accounts.
The result? A clean, repeatable bank reconciliation across every location, done the
same way each month and documented so anyone can run it, not just the person who set
it up. Today the group closes faster, trusts its cash numbers, and no longer relies on
memory to tie out the bank.

**Reconciliation cleanup — ServiceTitan**
A home-services company came to us with payments running through ServiceTitan that
never cleanly matched the bank. Jobs were invoiced and paid, deposits and progress
payments came in at different times, and processing fees and write-offs made the
numbers hard to trust. Reconciling the month had become a guessing game.
We rebuilt it: matched ServiceTitan payments to bank deposits, reconciled invoiced jobs
against the cash actually received, handled deposits and progress billing so revenue
landed at the right time, and captured the fees and adjustments that were throwing
everything off.
The result? A reliable monthly reconciliation between ServiceTitan and the bank, with
nothing slipping through and a process the team can repeat. Today they know what's been
collected, what's still outstanding, and that the books match the bank.

**Expense automation — Ramp implementation**
A roofing company came to us running expenses the hard way: cards floating around,
receipts piling up, and no real visibility into who was spending what until the
statement showed up. Coding it all after the fact ate hours every month.
We implemented Ramp end to end: issued cards with spend limits by role and crew,
automated receipt capture and matching, set approval routing and a clear spend policy,
and synced everything to the books with automatic coding.
The result? A live spend-management system where every dollar is controlled up front,
receipts capture themselves, and coded transactions flow straight into the books with
no manual re-entry. Today the owner sees spend in real time and month-end close is
faster, without adding a single person to the back office.

**Custom reporting**
A growing company came to us with plenty of data but no clear picture. The numbers
lived in different places, reports were rebuilt by hand each month, and leadership was
deciding on a lag.
We started with the questions that actually mattered, then built the reporting to
answer them: defined the KPIs with leadership, pulled the numbers into one trusted
source, built a clean recurring dashboard, and automated the refresh so it stays
current. Then we made sure the team knew how to read and use it.
The result? A custom, automated reporting package leadership actually uses to make
decisions, not a report that gets built once and ignored. Today the numbers are current,
consistent, and in one place, and decisions happen on real information instead of gut feel.

---

## Step 1 schema we added (for verification)

New `founder` object in `objects.ts` (fields: name, credential, bio [text],
outsideWork [text, optional], photo [image + alt, hotspot]).

New `aboutPage` singleton in `singletons.ts` with groups Hero / The story / Rooted in
St. Louis / Founders / What we promise / First client / SEO, holding:
- hero { eyebrow, heading (req), lead }
- story { eyebrow, heading (req), body (text, req) }
- rooted { eyebrow, heading (req), body (text), pullQuote (text) }
- founders { eyebrow, heading, people [array of founder, max 4] }
- promises { eyebrow, heading, items [array of string] }
- firstClient { eyebrow, heading, body (text) }
- seo (type seo)

Registered: `founder` + `aboutPage` imported and added to the `schemaTypes` array in
`schemaTypes/index.ts`; `"aboutPage"` added to `SINGLETONS` and a desk `listItem`
("Our Story page", id/documentId `aboutPage`) added in `structure.ts`.
