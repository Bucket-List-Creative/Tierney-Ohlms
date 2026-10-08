import { cn } from "@/lib/cn";
import type { Engagement } from "@/lib/types";

/**
 * Scope, rendered as a density ramp rather than a judgement.
 *
 * The competitor page this answers grades each client from "Very Simple" to
 * "Advanced" on a green-to-red scale, which tells a prospect nothing useful
 * and reads as a risk assessment of them. Here the visual weight tracks how
 * much of the accounting function we own — solid, outlined, light — so the
 * chip explains the price instead of ranking the client.
 */
const SCOPE_TONE: Record<string, string> = {
  "Full Stack": "bg-ink text-white border-ink",
  "Limited Scope": "bg-gold/[.08] text-brass border-gold/55",
  Supplement: "bg-alabaster text-slate border-rule",
};

function ScopeChip({ scope }: { scope: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[.12em]",
        SCOPE_TONE[scope] ?? "bg-alabaster text-slate border-rule",
      )}
    >
      {scope}
    </span>
  );
}

/**
 * Published engagements.
 *
 * Two layouts rather than one scrolling table: a six-column grid from 900px,
 * and stacked cards below it. A table that scrolls sideways on a phone is the
 * single most common source of horizontal overflow on a site like this, and
 * the monthly fee — the number everyone is scanning for — is exactly what
 * ends up off-screen.
 */
export function PricingTable({ engagements }: { engagements: Engagement[] }) {
  return (
    <div>
      {/* ---- Table, 900px and up ---- */}
      <div className="max-[899px]:hidden">
        <div
          role="table"
          className="overflow-hidden rounded-panel border border-rule bg-white shadow-[var(--shadow-rest)]"
        >
          <div
            role="row"
            className="grid grid-cols-[1.4fr_1fr_1.1fr_1fr] items-center gap-6 border-b border-rule bg-alabaster px-7 py-4 font-mono text-[11px] uppercase tracking-[.14em] text-slate"
          >
            <span role="columnheader">Industry</span>
            <span role="columnheader">Annual revenue</span>
            <span role="columnheader">Scope</span>
            <span role="columnheader" className="text-right">
              Monthly fee
            </span>
          </div>

          {engagements.map((e) => (
            <div
              key={`${e.industry}-${e.monthlyCost}`}
              role="row"
              className="grid grid-cols-[1.4fr_1fr_1.1fr_1fr] items-center gap-6 border-b border-rule px-7 py-6 transition-colors duration-300 last:border-b-0 hover:bg-alabaster/60"
            >
              <div role="cell" className="flex flex-col gap-1">
                <span className="font-display text-[19px] font-semibold text-ink">
                  {e.industry}
                </span>
                {e.note ? (
                  <span className="text-[13px] leading-snug text-slate">{e.note}</span>
                ) : null}
              </div>
              <span role="cell" className="font-mono text-[14px] text-slate">
                {e.annualRevenue}
              </span>
              <span role="cell">
                <ScopeChip scope={e.scope} />
              </span>
              <span
                role="cell"
                className="stat-numeral text-right font-display text-[26px] leading-none"
              >
                {e.monthlyCost}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Cards, below 900px ---- */}
      <ul className="m-0 flex list-none flex-col gap-4 p-0 min-[900px]:hidden">
        {engagements.map((e) => (
          <li
            key={`${e.industry}-${e.monthlyCost}`}
            className="rounded-panel border border-rule bg-white p-6 shadow-[var(--shadow-rest)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-display text-[19px] font-semibold text-ink">
                  {e.industry}
                </span>
                <span className="font-mono text-[13px] text-slate">
                  {e.annualRevenue} revenue
                </span>
              </div>
              <span className="stat-numeral shrink-0 font-display text-[24px] leading-none">
                {e.monthlyCost}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <ScopeChip scope={e.scope} />
              <span className="font-mono text-[11px] uppercase tracking-[.12em] text-dark-label">
                per month
              </span>
            </div>
            {e.note ? (
              <p className="mb-0 mt-3 text-[13.5px] leading-relaxed text-slate">{e.note}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
