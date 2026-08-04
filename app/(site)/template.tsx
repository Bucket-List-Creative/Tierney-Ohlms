"use client";

import type { ReactNode } from "react";

/**
 * Page transition. A template (unlike a layout) remounts on every navigation,
 * so this replays a short rise-and-fade as each route paints — the page arrives
 * rather than snapping in. It animates opacity/transform only, and CSS drops
 * the movement entirely for reduced-motion users.
 */
export default function SiteTemplate({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
