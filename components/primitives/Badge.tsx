import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant = "default" | "featured";

const variants: Record<BadgeVariant, string> = {
  // Quiet chip — alabaster fill, hairline border.
  default: "bg-alabaster border border-rule text-ink",
  // Featured — gold border, brass text (the one gold-adjacent chip).
  featured: "bg-white border border-gold text-brass",
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-input px-3 py-1.5 text-[13px] font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
