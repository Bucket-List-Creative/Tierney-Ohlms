"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { prefersReducedMotion, useRafScroll } from "@/lib/motion";

/**
 * Translates its children vertically as the section scrolls past — the amount
 * is a fraction of the element's travel, so it never drifts far enough to
 * leave a gap. Disabled for reduced motion and on narrow screens, where the
 * effect costs more than it adds.
 */
export function Parallax({
  children,
  /** Total travel in px across the full scroll of the element through the viewport. */
  strength = 60,
  className,
  minWidth = 900,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
  minWidth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => setEnabled(mq.matches && !prefersReducedMotion());
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [minWidth]);

  useRafScroll(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    if (rect.bottom < -200 || rect.top > vh + 200) return;
    // -1 (entering from below) → 1 (leaving past the top)
    const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
    el.style.transform = `translate3d(0, ${(progress * strength).toFixed(2)}px, 0)`;
  }, enabled);

  useEffect(() => {
    if (!enabled && ref.current) ref.current.style.transform = "";
  }, [enabled]);

  return (
    <div ref={ref} className={className} style={{ willChange: enabled ? "transform" : undefined }}>
      {children}
    </div>
  );
}
