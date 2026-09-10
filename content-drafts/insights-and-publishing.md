# Insights and client stories

Recommended home: `/insights`, linked from the main navigation and footer, with individual articles at `/insights/[slug]`. Client stories should also appear beside the relevant service; the Recon Electric story fits Systems & Automation and Controller Services & Reporting.

Current status: the site has Sanity Studio at `/studio` and general Pages, but no article schema, article listing, or article detail template. The paths above are proposed, not implemented. General Pages only support section headings and lead text and are not a complete blog workflow.

For ongoing publishing, add an Article content type with title, slug, excerpt, cover image/alt text, author, publication date, category, rich-text body, related services, and SEO fields. Editors can then draft and review in Studio and publish without code changes. The implementation should add article routes to the sitemap and connect the article type to the existing revalidation webhook. Existing content has a one-hour cache fallback; verify the publish webhook when enabling articles.

## Recon Electric — draft for review

Title: Helping Recon Electric get its reporting back on track

Excerpt: Tierney & Ohlms helped Recon Electric untangle its use of ServiceTitan and get financial reporting back on track.

Recon Electric needed help untangling its use of ServiceTitan and getting reporting back on track. Tierney & Ohlms worked with the company to address that challenge and bring its reporting back on track.

This is a starting point based only on the supplied facts. Before expanding the story, gather the specific reporting issue, what changed in ServiceTitan or the accounting process, and the concrete reporting improvement. Add a client quote or measured outcome only when supplied, and confirm client approval before publishing the named story.

## Applying this round of CMS edits

The local content mirror and seed include the revised positioning, FAQ, story, and single response promise. Configured environments read published Sanity content instead of the mirror. Sync completed: all nine target documents were published to Sanity and all 31 updated fields were verified by reading them back from the API. The temporary FAQ override has been removed so future FAQ edits come from Sanity.

For a future repeat of this update, with `SANITY_API_WRITE_TOKEN` configured locally with Editor access, preview and apply the targeted field updates:

```sh
node scripts/push-content.mjs --patch-file scripts/positioning-updates.json --dry-run
node scripts/push-content.mjs --patch-file scripts/positioning-updates.json
```

The patch file changes only the specified fields on nine target documents. Missing target documents are initialized from the updated seed; existing documents are preserved. Review it before applying if those fields have been edited in Studio since this update. Do not run the full seed replacement to apply this copy change. The revised service entry points are currently defined in the Services page component; individual services and add-on descriptions remain CMS-managed.

The latest package also restores Our Story in the published navigation and includes the updated homepage service positioning. Validate offline with `npm run sanity:sync:check`, then run `npm run sanity:sync -- --dry-run` and `npm run sanity:sync` once an Editor token is configured. Layout changes (header, buttons, map component, and service hero) ship with the website code rather than the content sync.
