"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { useInView, prefersReducedMotion } from "@/lib/motion";

export type RevealVariant = "up" | "blur" | "mask" | "scale" | "left" | "right";

/** Resting (pre-reveal) state per variant. The settled state is always
 *  identity, so every variant animates on compositor-friendly properties. */
const from: Record<RevealVariant, CSSProperties> = {
  up: { opacity: 0, transform: "translate3d(0,26px,0)" },
  blur: { opacity: 0, transform: "translate3d(0,14px,0)", filter: "blur(10px)" },
  mask: { opacity: 0, clipPath: "inset(0 0 100% 0)", transform: "translate3d(0,18px,0)" },
  scale: { opacity: 0, transform: "translate3d(0,18px,0) scale(0.965)" },
  left: { opacity: 0, transform: "translate3d(-28px,0,0)" },
  right: { opacity: 0, transform: "translate3d(28px,0,0)" },
};

/**
 * Reveals its children the first time they scroll into view, then stops
 * observing. `variant` picks the entrance; `delay` staggers siblings.
 * Reduced-motion users get the content immediately, with no transform.
 *
 * Once the entrance finishes, every transient property is dropped — clip-path
 * in particular, because leaving it on would clip offset panels and shadows
 * outside the box and blank out any `backdrop-filter` descendant.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 800,
  variant = "up",
  className,
  style,
  as: Tag = "div",
}: {
  children: ReactNode;
  /** ms */
  delay?: number;
  /** ms */
  duration?: number;
  variant?: RevealVariant;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "li" | "section" | "article" | "span" | "p";
}) {
  // Reduced motion: skip observation and paint the final state on mount.
  const reduced = prefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ disabled: reduced });
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!inView || settled) return;
    const t = window.setTimeout(
      () => setSettled(true),
      reduced ? 0 : delay + duration + 80,
    );
    return () => window.clearTimeout(t);
  }, [inView, settled, delay, duration, reduced]);

  const settledStyle: CSSProperties = settled
    ? {}
    : {
        opacity: 1,
        transform: "translate3d(0,0,0) scale(1)",
        filter: "blur(0px)",
        ...(variant === "mask" ? { clipPath: "inset(-4% -8% -8% -4%)" } : null),
        willChange: "transform, opacity",
      };

  return (
    <Tag
      ref={ref as never}
      className={className}
      // Marks the element for the <noscript> override in the root layout: with
      // no JS the entrance never runs, and the resting state would hide it.
      data-reveal=""
      style={{
        ...(inView ? settledStyle : { ...from[variant], willChange: "transform, opacity" }),
        transitionProperty: "opacity, transform, filter, clip-path",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: inView ? `${delay}ms` : "0ms",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * Staggers a list of children through the same entrance. Children are wrapped
 * individually so a grid/flex parent keeps its own layout — pass the layout
 * classes on `className` and this renders as that element.
 */
export function Stagger({
  children,
  step = 80,
  start = 0,
  variant = "up",
  duration = 800,
  className,
  childClassName,
  as = "div",
}: {
  children: ReactNode[];
  /** ms between siblings */
  step?: number;
  start?: number;
  variant?: RevealVariant;
  duration?: number;
  className?: string;
  childClassName?: string;
  as?: "div" | "ul";
}) {
  const Tag = as;
  return (
    <Tag className={className}>
      {children.map((child, i) => (
        <Reveal
          key={i}
          variant={variant}
          duration={duration}
          delay={start + i * step}
          className={childClassName}
          as={as === "ul" ? "li" : "div"}
        >
          {child}
        </Reveal>
      ))}
    </Tag>
  );
}
