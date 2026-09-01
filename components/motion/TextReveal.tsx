"use client";

import { Fragment, type CSSProperties, type ElementType } from "react";
import { useInView, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Headline entrance: each word rises out of its own clipping band, a beat
 * after the one before it. The text stays a single readable string in the DOM
 * (words are plain spans separated by real spaces), so selection, search, and
 * screen readers are unaffected.
 */
export function TextReveal({
  text,
  emphasis,
  as: Tag = "h2",
  className,
  delay = 0,
  step = 55,
  duration = 900,
  style,
}: {
  text: string;
  /**
   * Trailing phrase of `text` to render as the site's italic ink→brass `<em>`
   * — the same emphasis the homepage puts on the last phrase of every heading.
   * Ignored unless `text` actually ends with it.
   */
  emphasis?: string;
  as?: ElementType;
  className?: string;
  /** ms before the first word moves */
  delay?: number;
  /** ms between words */
  step?: number;
  duration?: number;
  style?: CSSProperties;
}) {
  const reduced = prefersReducedMotion();
  const { ref, inView } = useInView<HTMLHeadingElement>({
    rootMargin: "0px 0px -12% 0px",
    disabled: reduced,
  });
  const words = text.split(" ");
  // Emphasis is applied per word, so the words keep their own reveal bands and
  // the heading stays one selectable string.
  const emphasisFrom =
    emphasis && text.endsWith(emphasis)
      ? words.length - emphasis.trim().split(" ").length
      : words.length;

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {words.map((word, i) => (
        // The space lives between the bands, not inside them — a space inside
        // an inline-block gets collapsed away and the words run together.
        <Fragment key={`${word}-${i}`}>
          <span
            // Clip the band on the vertical only: descenders and italic
            // overhangs must not be shaved off the sides.
            className="inline-block align-bottom [clip-path:inset(-0.02em_-0.3em_0_-0.08em)]"
          >
            <span
              className="inline-block"
              data-reveal=""
              style={{
                transform: inView ? "translate3d(0,0,0)" : "translate3d(0,110%,0)",
                opacity: inView ? 1 : 0,
                transition: `transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${
                  delay + i * step
                }ms, opacity ${Math.round(duration * 0.7)}ms ease ${delay + i * step}ms`,
              }}
            >
              {i >= emphasisFrom ? (
                <em className="gradient-text">{word}</em>
              ) : (
                word
              )}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

/** Non-splitting variant for copy that should fade as one block. */
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 800,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: ElementType;
}) {
  const { ref, inView } = useInView<HTMLElement>({ disabled: prefersReducedMotion() });
  return (
    <Tag
      ref={ref as never}
      className={cn(className)}
      data-reveal=""
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0,0,0)" : "translate3d(0,16px,0)",
        transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
