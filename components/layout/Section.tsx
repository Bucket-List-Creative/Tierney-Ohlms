import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Ground = "white" | "bone" | "gold" | "quiet" | "dark";

/**
 * Section shell — enforces the 120px vertical rhythm (92px at ≤1279, 68px at
 * ≤767), the 1240px centered container, the ground treatment, and the gradient
 * hairlines at section transitions.
 *
 * `atmosphere` takes decorative light layers (orbs, washes). They're clipped to
 * the section and sit behind content on their own layer, so no z-index
 * bookkeeping leaks into the section's own markup.
 */
export function Section({
  id,
  ground = "white",
  ruleTop = false,
  ruleBottom = false,
  className,
  innerClassName,
  children,
  atmosphere,
  bare = false,
}: {
  id?: string;
  ground?: Ground;
  ruleTop?: boolean;
  ruleBottom?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  atmosphere?: ReactNode;
  /** When true, skip the inner container (caller supplies full-bleed content). */
  bare?: boolean;
}) {
  const grounds: Record<Ground, string> = {
    white: "bg-white",
    bone: "mesh-bone",
    gold: "surface-gold",
    quiet: "mesh-quiet",
    dark: "mesh-dark",
  };
  const dark = ground === "dark";

  return (
    <section
      id={id}
      className={cn("atmos", grounds[ground], className)}
    >
      {atmosphere}

      {ruleTop ? (
        <div
          aria-hidden
          className={cn(
            "absolute inset-x-0 top-0 z-[2]",
            dark ? "rule-fade-dark" : "rule-fade",
          )}
        />
      ) : null}

      {bare ? (
        children
      ) : (
        <div
          className={cn(
            "container-x relative z-[1] py-section max-[1279px]:py-section-md max-[767px]:py-section-sm",
            innerClassName,
          )}
        >
          {children}
        </div>
      )}

      {ruleBottom ? (
        <div
          aria-hidden
          className={cn(
            "absolute inset-x-0 bottom-0 z-[2]",
            dark ? "rule-fade-dark" : "rule-fade",
          )}
        />
      ) : null}
    </section>
  );
}

/**
 * Named light layers for `Section atmosphere`. Each is a soft radial wash
 * (pure gradient — no filters) that drifts slowly, or holds still for
 * reduced-motion users.
 */
export function Orb({
  tone = "gold",
  className,
  drift,
}: {
  tone?: "gold" | "bone" | "ink";
  className?: string;
  drift?: "a" | "b";
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "atmos-layer",
        tone === "gold" && "orb-gold",
        tone === "bone" && "orb-bone",
        tone === "ink" && "orb-ink",
        drift === "a" && "drift-a",
        drift === "b" && "drift-b",
        className,
      )}
    />
  );
}
