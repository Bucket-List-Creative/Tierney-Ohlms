"use client";

import Link from "next/link";
import { createElement, useRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tag = "div" | "article" | "section" | "li" | "span";

/** rAF-gated pointer tracking: writes `--mx`/`--my` and nothing else, so it can
 *  never trigger layout. `.spotlight` turns those into a warm highlight. */
function usePointerVars() {
  const raf = useRef(0);
  return (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const { clientX, clientY } = e;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - r.left}px`);
      el.style.setProperty("--my", `${clientY - r.top}px`);
    });
  };
}

/**
 * A surface whose warm highlight follows the cursor. Without a pointer the CSS
 * still fades a centred glow in on hover/focus, so nothing depends on the JS.
 */
export function Spotlight({
  children,
  className,
  as = "div",
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** Stronger glow, tuned for dark surfaces. */
  dark?: boolean;
}) {
  const onPointerMove = usePointerVars();
  return createElement(
    as,
    { onPointerMove, className: cn("spotlight", dark && "spotlight-dark", className) },
    children,
  );
}

/** The same treatment on a navigational link. */
export function SpotlightLink({
  children,
  className,
  dark = false,
  ...rest
}: ComponentProps<typeof Link> & { dark?: boolean }) {
  const onPointerMove = usePointerVars();
  return (
    <Link
      {...rest}
      onPointerMove={onPointerMove}
      className={cn("spotlight", dark && "spotlight-dark", className)}
    >
      {children}
    </Link>
  );
}
