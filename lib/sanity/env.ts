/**
 * Sanity environment. When projectId is missing (before you connect Sanity),
 * `isSanityConfigured` is false and the app renders from lib/content instead,
 * so `npm run dev` works with zero credentials.
 */
export const projectId = (
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ""
).trim();
export const dataset = (
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"
).trim();
export const apiVersion = (
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01"
).trim();

/**
 * Server-only. Never import this into a client component.
 *
 * Trimmed, and with surrounding quotes stripped, because the value is pasted
 * by hand into a hosting dashboard. A stray newline or a pair of quotes
 * carried over from .env.local does not read as "no token" — it reads as a
 * *wrong* token, and Sanity answers 401 SIO-401-ANF "Session not found",
 * which under SANITY_STRICT_FETCH fails the production build outright. An
 * unusable value is better treated as absent: published content on a public
 * dataset still reads fine without any token.
 */
const rawReadToken = (process.env.SANITY_API_READ_TOKEN ?? "")
  .trim()
  .replace(/^["']|["']$/g, "")
  .trim();

export const readToken = rawReadToken.startsWith("sk") ? rawReadToken : "";

if (rawReadToken && !readToken) {
  console.warn(
    "[sanity] SANITY_API_READ_TOKEN is set but does not look like a token " +
      '(expected it to start with "sk"). Ignoring it and reading published ' +
      "content anonymously. Re-paste the token with no quotes or line breaks.",
  );
}

export const isSanityConfigured =
  projectId.length > 0 && projectId !== "your_project_id";

export function assertProjectId(): string {
  if (!isSanityConfigured) {
    throw new Error(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Add it to .env.local (see .env.example).",
    );
  }
  return projectId;
}
