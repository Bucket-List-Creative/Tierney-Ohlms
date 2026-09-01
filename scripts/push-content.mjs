#!/usr/bin/env node
/**
 * Push scripts/seed.ndjson into the Sanity dataset over the HTTP mutation API.
 *
 * Unlike `sanity dataset import --replace`, this is additive and idempotent:
 * every document is `createOrReplace`d by its stable `_id`, so re-running it
 * updates the documents this repo owns and leaves anything else in the dataset
 * (uploaded images, editor-authored pages) untouched.
 *
 *   SANITY_API_WRITE_TOKEN=... node scripts/push-content.mjs [--dry-run]
 *
 * The token needs Editor rights — the read token in .env.local cannot mutate.
 * Project id / dataset are read from .env.local, or from the environment.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

/** Minimal .env reader — we only need three keys and want no new dependency. */
function loadEnvFile(path) {
  let raw;
  try {
    raw = readFileSync(path, "utf8");
  } catch {
    return {};
  }
  const out = {};
  for (const line of raw.split("\n")) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (!m) continue;
    out[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  return out;
}

const fileEnv = loadEnvFile(resolve(root, ".env.local"));
const pick = (key) => process.env[key] ?? fileEnv[key] ?? "";

const projectId = pick("NEXT_PUBLIC_SANITY_PROJECT_ID");
const dataset = pick("NEXT_PUBLIC_SANITY_DATASET") || "production";
const apiVersion = pick("NEXT_PUBLIC_SANITY_API_VERSION") || "2025-01-01";
const token = pick("SANITY_API_WRITE_TOKEN");
const dryRun = process.argv.includes("--dry-run");

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID.");
  process.exit(1);
}
if (!token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN.\n" +
      "Create an Editor token at https://manage.sanity.io → API → Tokens, then:\n" +
      "  SANITY_API_WRITE_TOKEN=sk... node scripts/push-content.mjs",
  );
  process.exit(1);
}

const docs = readFileSync(resolve(root, "scripts/seed.ndjson"), "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => JSON.parse(line));

const mutations = docs.map((doc) => ({ createOrReplace: doc }));

const url =
  `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}` +
  `?returnIds=true${dryRun ? "&dryRun=true" : ""}`;

const res = await fetch(url, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ mutations }),
});

const body = await res.json();
if (!res.ok || body.error) {
  console.error("Push failed:", JSON.stringify(body, null, 2));
  process.exit(1);
}

const counts = docs.reduce((acc, d) => {
  acc[d._type] = (acc[d._type] ?? 0) + 1;
  return acc;
}, {});

console.log(
  `${dryRun ? "[dry run] " : ""}Pushed ${docs.length} documents to ${projectId}/${dataset}:`,
);
for (const [type, n] of Object.entries(counts).sort()) {
  console.log(`  ${type.padEnd(14)} ${n}`);
}
