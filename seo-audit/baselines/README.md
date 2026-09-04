# Audit baselines

Machine-readable SEO signal snapshots from `audit_html.py` (react-sanity-seo skill).
Re-run after any metadata change and diff against these.

| File | What it captures |
|---|---|
| `pre-fix-static-export.json` | The original audit, 2026-09-04, before any fixes. Static-export build under the `/Tierney-Ohlms` basePath. No canonicals, no structured data. |
| `pre-seed-mirror.json` | After the canonical/sitemap/robots/JSON-LD work, but with both Sanity datasets still empty — so every value came from the `lib/content` mirror. |
| `post-seed-cms.json` | The same build rendering from the seeded Sanity dataset. This is the current reference. |

Regenerate the current one with:

```bash
npm run build
python3 <skill>/scripts/audit_html.py --local ".next/server/app/**/*.html" \
  --limit 40 --json seo-audit/baselines/post-seed-cms.json
```

Note: `pre-fix-static-export.json` was taken from a static-export build (`out/`), the
other two from the standard server build (`.next/server/app/`). URLs differ in prefix
as a result; the signal fields are comparable.
