import { LineIcon } from "@/components/icons/LineIcon";
import type { IconKey } from "@/components/icons/registry";
import { cn } from "@/lib/cn";

/**
 * Aura icon tile — light gold wash under grain, hairline border, ink glyph.
 * On hover (when inside a `group`) the border warms to gold and the tile lifts
 * into a soft halo: the one place gold is allowed to move.
 */
export function IconTile({
  icon,
  tile = 52,
  size = 24,
  className,
}: {
  icon: IconKey;
  /** Tile side length in px. */
  tile?: number;
  /** Glyph size in px. */
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      style={{ width: tile, height: tile }}
      className={cn(
        "aura-light inline-flex shrink-0 items-center justify-center rounded-btn border border-rule text-ink transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:border-gold group-hover:shadow-[var(--glow-gold)] motion-reduce:group-hover:translate-y-0",
        className,
      )}
    >
      <LineIcon name={icon} size={size} />
    </span>
  );
}
