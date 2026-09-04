# Audit baselines

Machine-readable SEO signal snapshots from `audit_html.py` (react-sanity-seo skill).
Re-run after any metadata change and diff against these.

| File | What it captures |
|---|---|
| `pre-fix-static-export.json` | The original audit, 2026-09-04, before any fixes. Static-export build under the `/Tierney-Ohlms` basePath. No canonicals, no structured data. |
| `pre-seed-mirror.json` | After the canonical/sitemap/robots/JSON-LD work, but with both Sanity datasets still empty — so every value came from the `lib/content` mirror. |
| `preview-blocked.json` | A preview build with `NEXT_PUBLIC_SITE_LIVE` unset: every page `noindex, nofollow`, empty sitemap, `robots.txt` disallowing everything — while canonicals and JSON-LD stay correct underneath. |
| `post-seed-cms.json` | The same build with `NEXT_PUBLIC_SITE_LIVE=true`, rendering from the seeded Sanity dataset. **This is what production should look like.** |

## Regenerating

`SKILL` is the react-sanity-seo skill directory.

```bash
# What production should emit
rm -rf .next
NEXT_PUBLIC_SITE_LIVE=true npm run build
python3 "$SKILL/scripts/audit_html.py" --local ".next/server/app/**/*.html" \
  --limit 40 --json seo-audit/baselines/post-seed-cms.json

# What a preview must emit (flag deliberately unset)
rm -rf .next
npm run build
python3 "$SKILL/scripts/audit_html.py" --local ".next/server/app/**/*.html" \
  --limit 40 --json seo-audit/baselines/preview-blocked.json
```

## Reading them

Two things are easy to get wrong when diffing these:

- **Count titles as "pages with a non-empty title", not as a set of distinct values.**
  A missing title is `null`, and `null` counts as a distinct value — so a set-based
  count reports a page with no title as if it had a unique one. That masked a real
  regression once already (see P2-12 in the audit report).
- **`lastmod` is the tell for which content source a build used.** The seed and the
  local mirror hold identical values, so output looks the same either way. Only the
  CMS supplies `_updatedAt`. A sitemap with URLs but no `lastmod` means the build fell
  back to the mirror — usually a stale CDN read straight after a content change (P2-11).

`pre-fix-static-export.json` came from a static-export build (`out/`); the other three
from the standard server build (`.next/server/app/`). URLs differ in prefix as a result;
the signal fields are comparable.
