#!/usr/bin/env node
/**
 * Compare scripts/seed.ndjson against the live Sanity dataset, field by field.
 *
 * `push-content.mjs` createOrReplaces by stable _id, so running it blind would
 * overwrite anything an editor has changed in the Studio. This answers the
 * question that has to come first: which side is ahead, and on which fields?
 *
 *   node scripts/sanity-diff.mjs            # summary
 *   node scripts/sanity-diff.mjs --verbose  # show both values for each drift
 *
 * Read-only. Never mutates.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const verbose = process.argv.includes("--verbose");

function loadEnvFile(path) {
  let raw;
  try { raw = readFileSync(path, "utf8"); } catch { return {}; }
  const out = {};
  for (const line of raw.split("\n")) {
    const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (m) out[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
  return out;
}
const fileEnv = loadEnvFile(resolve(root, ".env.local"));
const pick = (k) => process.env[k] ?? fileEnv[k] ?? "";

const projectId = pick("NEXT_PUBLIC_SANITY_PROJECT_ID");
const dataset = pick("NEXT_PUBLIC_SANITY_DATASET") || "production";
const apiVersion = pick("NEXT_PUBLIC_SANITY_API_VERSION") || "2025-01-01";
const token = pick("SANITY_API_READ_TOKEN") || pick("SANITY_API_WRITE_TOKEN");
if (!projectId) throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set");

const seed = readFileSync(resolve(root, "scripts/seed.ndjson"), "utf8")
  .split("\n").map((l) => l.trim()).filter(Boolean).map((l) => JSON.parse(l));

const ids = seed.map((d) => d._id);
const query = `*[_id in $ids]`;
const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}` +
  `?query=${encodeURIComponent(query)}&$ids=${encodeURIComponent(JSON.stringify(ids))}`;

const res = await fetch(url, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
if (!res.ok) throw new Error(`Sanity query failed: ${res.status} ${await res.text()}`);
const live = new Map((await res.json()).result.map((d) => [d._id, d]));

/** Sanity's own bookkeeping, plus array _keys which are not content. */
const SYSTEM = new Set(["_rev", "_createdAt", "_updatedAt", "_type", "_id"]);
const strip = (v) => {
  if (Array.isArray(v)) return v.map(strip);
  if (v && typeof v === "object") {
    const o = {};
    for (const k of Object.keys(v).sort()) {
      if (k === "_key") continue;
      o[k] = strip(v[k]);
    }
    return o;
  }
  return v;
};
const same = (a, b) => JSON.stringify(strip(a)) === JSON.stringify(strip(b));

let missing = 0, drifted = 0, identical = 0;
const report = [];

for (const doc of seed) {
  const l = live.get(doc._id);
  if (!l) { missing++; report.push([doc._id, "MISSING IN SANITY", []]); continue; }
  const fields = Object.keys(doc).filter((k) => !SYSTEM.has(k));
  const diffs = fields.filter((f) => !same(doc[f], l[f]));
  if (diffs.length) { drifted++; report.push([doc._id, "DIFFERS", diffs]); }
  else identical++;
}

console.log(`seed documents: ${seed.length}   in Sanity: ${live.size}`);
console.log(`identical: ${identical}   differing: ${drifted}   missing from Sanity: ${missing}\n`);
for (const [id, status, diffs] of report) {
  console.log(`${status.padEnd(18)} ${id}${diffs.length ? "  ->  " + diffs.join(", ") : ""}`);
  if (verbose && diffs.length) {
    const doc = seed.find((d) => d._id === id), l = live.get(id);
    for (const f of diffs) {
      console.log(`    seed : ${JSON.stringify(strip(doc[f])).slice(0, 220)}`);
      console.log(`    live : ${JSON.stringify(strip(l[f])).slice(0, 220)}`);
    }
  }
}
if (!report.length) console.log("No drift. seed.ndjson and the dataset agree on every field.");
