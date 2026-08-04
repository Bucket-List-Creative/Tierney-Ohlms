"use client";

import { useInView, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * A hairline that draws itself across (or down) the section as it enters view —
 * used to trace the path between process steps. Pure scale on the compositor.
 */
export function DrawLine({
  className,
  vertical = false,
  duration = 1200,
  delay = 0,
}: {
  className?: string;
  vertical?: boolean;
  duration?: number;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({
    rootMargin: "0px 0px -18% 0px",
    disabled: prefersReducedMotion(),
  });

  return (
    <span
      ref={ref}
      aria-hidden
      className={cn("block", className)}
      style={{
        transformOrigin: vertical ? "top center" : "left center",
        transform: inView
          ? "scale(1)"
          : vertical
            ? "scaleY(0)"
            : "scaleX(0)",
        transition: `transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    />
  );
}
