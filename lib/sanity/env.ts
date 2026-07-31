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

/** Server-only. Never import this into a client component. */
export const readToken = process.env.SANITY_API_READ_TOKEN ?? "";

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
