import { LineIcon } from "@/components/icons/LineIcon";
import type { IconKey } from "@/components/icons/registry";
import { cn } from "@/lib/cn";

/**
 * Aura icon tile — light gold wash under grain, hairline border, ink glyph.
 * On hover (when inside a `group`) the border warms to gold: the one place
 * gold is allowed to move.
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
        "aura-light inline-flex shrink-0 items-center justify-center rounded-btn border border-rule text-ink transition-colors duration-[250ms] group-hover:border-gold",
        className,
      )}
    >
      <LineIcon name={icon} size={size} />
    </span>
  );
}
