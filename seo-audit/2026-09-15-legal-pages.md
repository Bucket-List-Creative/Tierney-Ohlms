# Privacy Policy and Terms of Service — draft notes

**Date:** 2026-09-15 · **Branch:** `feat/legal-pages` (stacked on `fix/seo-export-and-metadata`)
**Closes:** P1-8 from `2026-09-04-seo-audit.md` — both links pointed at `#top`.

**These are drafts, not final legal documents.** I am not qualified to give legal advice, and neither page should be treated as reviewed. `LEGAL_REVIEW_PENDING` in `lib/content/legal.ts` renders a visible "Draft pending review" notice on both pages until someone qualified signs them off; setting it to `false` is the only change needed to publish them as final.

---

## How the content was produced

Not from a template. Every factual claim about data handling was verified against the source:

| Claim | Verified against |
|---|---|
| Contact form fields (name, company, email, phone, service, message) | `components/sections/ContactForm.tsx` |
| Submissions go to Jotform | `app/api/contact/route.ts` → `lib/jotform.ts` |
| Google Maps is embedded and sets its own cookies | `components/primitives/MapCard.tsx` — `output=embed` iframe |
| Client portal is a link-out, not an embed | `lib/content/index.ts` — `portalHref` → Financial Cents |
| Fonts are self-hosted, so no request reaches a font provider | `lib/fonts.ts` — `next/font` |
| No analytics, no cookies, no local/session storage | Searched `app/`, `components/`, `lib/` for gtag, GTM, analytics, posthog, plausible, cookie, localStorage, sessionStorage — **zero hits** |

That last one is worth stating plainly: this site genuinely does no tracking. The policy says so because it is true, not because it is a nice thing to say.

## Deliberately not asserted

Each of these would have been invented. They are omitted from the pages rather than guessed:

- **Legal entity name and type.** Only the trading name "Tierney & Ohlms" appears anywhere in the repo.
- **Governing law / jurisdiction.** Missouri is the obvious guess. A guess is not good enough on this line.
- **Data retention periods** — for server logs or for Jotform submissions.
- **Hosting provider**, so the policy describes server logs generically rather than naming a processor.
- **Regulatory position.** An accounting firm may fall under the GLBA Safeguards Rule, IRS Publication 4557, and state CPA board rules. The pages make no compliance claim either way. **This is the item most worth a professional's attention.**
- **Whether form submitters are added to any mailing list.** The policy currently says they are not added without asking.

## Questions for the client

1. Registered legal entity name and state of formation.
2. Governing law for the Terms.
3. Is the firm subject to GLBA / IRS Pub 4557 obligations, and should the policy say so?
4. How long are contact form submissions retained in Jotform, and who can see them?
5. Who is the contact for a data access or deletion request? (Currently the general email.)
6. Hosting provider, for the server-log paragraph.
7. Are form submitters ever added to marketing email?

---

## One thing the deploy-preflight flags

The `sanity-deploy-preflight` skill treats legal text as an ambiguous case: favour making it client-editable, but flag rather than silently restructure.

This content is **in code** (`lib/content/legal.ts`), not in Sanity. That is deliberate **for now**:

- The text is a draft that will be replaced wholesale once reviewed. Building CMS fields for placeholder copy that is about to be thrown away is wasted work.
- Legal text changing through a reviewed pull request is a feature, not friction.

**But it should move to Sanity once the final reviewed text exists**, otherwise the client needs a developer every time their lawyer revises a policy. That is a genuine handoff gap — recorded here so it is not forgotten rather than discovered later.

## The footer links need a Sanity change too

`legalLinks` is CMS-driven, and the live dataset still holds `#top`. The local mirror and `scripts/seed.ndjson` are updated, and a targeted patch is staged in `scripts/positioning-updates.json`, validated with no network calls:

```
npm run sanity:sync:check   # validates, writes nothing
npm run sanity:sync         # applies the patch to the live dataset
```

Until that patch is applied, the footer links stay dead in production even though the pages exist.
