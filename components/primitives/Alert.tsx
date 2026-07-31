import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Informational alert — the single sanctioned use of a colored (gold) border,
 * and only on the left edge. Not for errors/success unrelated to info.
 */
export function Alert({
  title,
  children,
  className,
}: {
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="note"
      className={cn(
        "flex flex-col gap-1.5 rounded-card border border-rule border-l-[3px] border-l-gold bg-white px-7 py-6",
        className,
      )}
    >
      <span className="text-sm font-semibold text-ink">{title}</span>
      {children ? (
        <span className="text-sm leading-relaxed text-slate">{children}</span>
      ) : null}
    </div>
  );
}
