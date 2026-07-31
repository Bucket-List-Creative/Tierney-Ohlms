import { createElement } from "react";
import { getIcon, type IconKey } from "./registry";

type LineIconProps = {
  name: IconKey;
  size?: number;
  strokeWidth?: number;
  className?: string;
  /** Decorative by default — hidden from assistive tech unless a title is given. */
  title?: string;
};

/**
 * Renders a Lucide registry icon with a consistent 1.75px stroke.
 * Uses createElement so the icon is a registry lookup, not a component
 * re-created during render. Decorative unless a `title` is supplied.
 */
export function LineIcon({
  name,
  size = 22,
  strokeWidth = 1.75,
  className,
  title,
}: LineIconProps) {
  return createElement(getIcon(name), {
    size,
    strokeWidth,
    className,
    absoluteStrokeWidth: true,
    "aria-hidden": title ? undefined : true,
    "aria-label": title,
    role: title ? "img" : undefined,
  });
}
