"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/lib/types";

/** Split "25+" → { prefix:"", num:25, suffix:"+" }; "100%" → num 100, suffix "%". */
function parseValue(value: string) {
  const m = value.match(/^(\D*)([\d,]+)(.*)$/);
  if (!m) return { prefix: "", num: null as number | null, suffix: value };
  return {
    prefix: m[1] ?? "",
    num: Number(m[2].replace(/,/g, "")),
    suffix: m[3] ?? "",
  };
}

const DURATION = 1400;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function AnimatedNumber({ value, run }: { value: string; run: boolean }) {
  const { prefix, num, suffix } = parseValue(value);
  const [count, setCount] = useState(0);

  // All setState happens inside requestAnimationFrame callbacks (never
  // synchronously in the effect body).
  useEffect(() => {
    if (num === null || !run) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const id = requestAnimationFrame(() => setCount(num));
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / DURATION, 1);
      setCount(Math.round(easeOutCubic(p) * num));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, num]);

  if (num === null) return <>{value}</>;
  return <>{`${prefix}${run ? count : 0}${suffix}`}</>;
}

/**
 * Animated statistics — numerals count up (ink→brass gradient) the first time
 * they scroll into view. Renders bare (no section wrapper) so it can be
 * embedded inside a hero. Honors prefers-reduced-motion.
 *
 * `variant="block"` (default) is the prominent four-up grid.
 * `variant="inline"` is a compact, small-text row — a quiet strip of proof
 * points woven into surrounding copy rather than a standalone feature.
 */
export function AnimatedStats({
  stats,
  className,
  variant = "block",
}: {
  stats: Stat[];
  className?: string;
  variant?: "block" | "inline";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    const fallback = window.setTimeout(() => setRun(true), 1600);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  /** Each stat drifts up as its numeral starts counting. */
  const enter = (i: number) => ({
    opacity: run ? 1 : 0,
    transform: run ? "translate3d(0,0,0)" : "translate3d(0,12px,0)",
    transition: `opacity 620ms ease ${i * 90}ms, transform 620ms cubic-bezier(0.16,1,0.3,1) ${i * 90}ms`,
  });

  if (variant === "inline") {
    return (
      <div
        ref={ref}
        className={
          "flex flex-wrap items-center gap-x-7 gap-y-3 " + (className ?? "")
        }
      >
        {stats.map((stat, i) => (
          <span
            key={stat._id}
            data-reveal=""
            style={enter(i)}
            className="inline-flex items-baseline gap-1.5"
          >
            <span className="stat-numeral text-[19px] leading-none">
              <AnimatedNumber value={stat.value} run={run} />
            </span>
            <span className="text-[13px] leading-none text-slate">{stat.label}</span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={
        "grid grid-cols-4 gap-x-8 gap-y-8 max-[520px]:grid-cols-2 " + (className ?? "")
      }
    >
      {stats.map((stat, i) => (
        <div
          key={stat._id}
          data-reveal=""
          style={enter(i)}
          className="flex flex-col items-start gap-2"
        >
          {/* Hairline that grows in under the numeral as it settles. */}
          <span
            aria-hidden
            className="block h-px w-full origin-left bg-gradient-to-r from-gold/70 to-transparent transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: run ? "scaleX(1)" : "scaleX(0)",
              transitionDelay: `${i * 90}ms`,
            }}
          />
          <div className="stat-numeral text-[44px] leading-none max-[767px]:text-[36px]">
            <AnimatedNumber value={stat.value} run={run} />
          </div>
          <div className="text-[14px] tracking-[0.01em] text-slate">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
