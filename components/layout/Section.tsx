import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Ground = "white" | "bone" | "gold";

/**
 * Section shell — enforces the 112px vertical rhythm (88px at ≤1279,
 * 64px at ≤767), the 1240px centered container, alternating grounds, and the
 * hairline rules at section transitions.
 */
export function Section({
  id,
  ground = "white",
  ruleTop = false,
  ruleBottom = false,
  className,
  innerClassName,
  children,
  bare = false,
}: {
  id?: string;
  ground?: Ground;
  ruleTop?: boolean;
  ruleBottom?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  /** When true, skip the inner container (caller supplies full-bleed content). */
  bare?: boolean;
}) {
  const grounds: Record<Ground, string> = {
    white: "bg-white",
    bone: "bg-bone",
    gold: "surface-gold",
  };
  return (
    <section
      id={id}
      className={cn(
        grounds[ground],
        ruleTop && "border-t border-rule",
        ruleBottom && "border-b border-rule",
        className,
      )}
    >
      {bare ? (
        children
      ) : (
        <div
          className={cn(
            "container-x py-section max-[1279px]:py-section-md max-[767px]:py-section-sm",
            innerClassName,
          )}
        >
          {children}
        </div>
      )}
    </section>
  );
}
