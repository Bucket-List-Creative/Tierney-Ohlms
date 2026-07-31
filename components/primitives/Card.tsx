import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type CardVariant = "default" | "interactive" | "flat";

const variants: Record<CardVariant, string> = {
  // Static white card with hairline border.
  default: "bg-white border border-rule rounded-card shadow-[var(--shadow-rest)]",
  // Hover lift: translateY(-3px) + hover shadow + border darken.
  interactive:
    "card-lift bg-white border border-rule rounded-card transition-all duration-[250ms] ease-out hover:-translate-y-[3px] hover:border-stroke hover:shadow-[var(--shadow-hover)]",
  // No border, no shadow.
  flat: "bg-white rounded-card",
};

type CardProps = ComponentProps<"div"> & {
  variant?: CardVariant;
  children: ReactNode;
};

export function Card({ variant = "default", className, children, ...rest }: CardProps) {
  return (
    <div className={cn(variants[variant], className)} {...rest}>
      {children}
    </div>
  );
}
