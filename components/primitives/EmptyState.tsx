import { LineIcon } from "@/components/icons/LineIcon";
import type { IconKey } from "@/components/icons/registry";
import type { ReactNode } from "react";

/**
 * Empty state — a 72px circular aura disc (the ONLY circular element in the
 * system) above a title and note.
 */
export function EmptyState({
  icon = "inbox",
  title,
  children,
}: {
  icon?: IconKey;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <span
        aria-hidden
        className="aura-light flex h-[72px] w-[72px] items-center justify-center rounded-full border border-rule text-ink"
      >
        <LineIcon name={icon} size={28} />
      </span>
      <h3 className="m-0 font-display text-card-title">{title}</h3>
      {children ? <p className="m-0 max-w-[40ch] text-sm text-slate">{children}</p> : null}
    </div>
  );
}
