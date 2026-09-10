"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import styles from "./HeroWorkspace.module.css";

/* ==========================================================================
   Placement — where a document sits in the workspace, and how it behaves.

   Every value here is authored as a resting, *ordered* position. The chaos
   offsets (ox/oy) and scattered rotations (tx/ty/tz) are what the camera's
   `--scatter` channel multiplies, so driving that to zero resolves the desk
   into a grid. Scroll drift (dx/dy/dz) is multiplied by `--spread`.
   ========================================================================== */

export type Place = {
  /** Rest centre, as a percentage of the viewport. */
  x: string;
  y: string;
  /** Authored width in px, before perspective scales it by depth. */
  w: number;
  /** Resting depth. Negative is further from the camera. */
  z?: number;
  /** Chaos offset in px, resolved away as the workspace organises. */
  ox?: number;
  oy?: number;
  /** Scattered rotation in deg, likewise resolved away. */
  tx?: number;
  ty?: number;
  tz?: number;
  /** Where the document drifts as the camera pushes through, in px. */
  dx?: number;
  dy?: number;
  dz?: number;
  /** Entrance stagger, ms. */
  delay?: number;
  /** Starting offset of the daylight sheen, %, so no two catch it alike. */
  sheen?: number;
  /** Atmospheric perspective — deeper paper reads slightly hazier. */
  o?: number;
  /** Height, for the foreground paper stock that has no interior. */
  h?: number;
  /** Phone placement (<=600px). Falls back to the desktop values. */
  xs?: string;
  ys?: string;
  ws?: number;
};

const px = (n?: number) => (n === undefined ? undefined : `${n}px`);
const deg = (n?: number) => (n === undefined ? undefined : `${n}deg`);

function placeVars(p: Place): CSSProperties {
  return {
    "--x": p.x,
    "--y": p.y,
    "--w": `${p.w}px`,
    "--z": px(p.z ?? 0),
    "--ox": px(p.ox),
    "--oy": px(p.oy),
    "--tx": deg(p.tx),
    "--ty": deg(p.ty),
    "--tz": deg(p.tz),
    "--dx": px(p.dx),
    "--dy": px(p.dy),
    "--dz": px(p.dz),
    "--delay": p.delay === undefined ? undefined : `${p.delay}ms`,
    "--sheen": p.sheen === undefined ? undefined : `${p.sheen}%`,
    "--o": p.o,
    "--h": px(p.h),
    "--xs": p.xs,
    "--ys": p.ys,
    "--ws": p.ws === undefined ? undefined : `${p.ws}px`,
  } as CSSProperties;
}

/**
 * One floating financial document. The outer `.doc` is pure 3D placement and
 * is rewritten every frame by the camera; the inner `.paper` owns the
 * entrance, so a CSS transition can never fight those writes.
 */
export function Doc({
  place,
  className,
  paper,
  children,
}: {
  place: Place;
  /** Classes for the 3D placement box — visibility breakpoints belong here. */
  className?: string;
  /** Classes for the paper itself — stock, radius, shadow. */
  paper?: string;
  children: ReactNode;
}) {
  return (
    <div aria-hidden className={`${styles.doc} ${className ?? ""}`} style={placeVars(place)}>
      <div className={`${styles.paper} ${paper ?? ""}`}>{children}</div>
    </div>
  );
}

/** A foreground artifact — no interior, just paper close to the lens. */
export function Foreground({
  place,
  className,
  children,
}: {
  place: Place;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div aria-hidden className={`${styles.fg} ${className ?? ""}`} style={placeVars(place)}>
      {children}
    </div>
  );
}

/* ==========================================================================
   Document interiors
   ========================================================================== */

export function Mono({ children }: { children: ReactNode }) {
  return <span className={styles.mono}>{children}</span>;
}

export function Head({ left, right }: { left: string; right: ReactNode }) {
  return (
    <div className={styles.head}>
      <Mono>{left}</Mono>
      <strong className={styles.gradient}>{right}</strong>
    </div>
  );
}

export function Rows({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <div className={styles.rows}>
      {rows.map(([left, right], i) => (
        <div key={i}>
          <span>{left}</span>
          <span className={i === rows.length - 1 ? styles.brass : styles.mono}>{right}</span>
        </div>
      ))}
    </div>
  );
}

/** Progress line. The fill is authored at its true width and revealed by a
 *  once-only `scaleX`, so the growth animation stays on the compositor. */
export function Progress({ value }: { value: string }) {
  return (
    <div className={styles.progress}>
      <i style={{ width: value }} />
    </div>
  );
}

export function Money({ value, live }: { value: string; live: boolean }) {
  const [whole, cents] = value.split(".");
  return (
    <span className={styles.money}>
      <sup>$</sup>
      <span className={styles.gradient}>
        <Tally value={whole} live={live} delay={520} />
      </span>
      {cents && <small>.{cents}</small>}
    </span>
  );
}

/** Cash-flow bars: authored heights, revealed once with a staggered scaleY. */
export function Bars({ heights }: { heights: number[] }) {
  return (
    <div className={styles.bars}>
      {heights.map((h, i) => (
        <i
          key={i}
          style={{ height: `${h}%`, "--i": i } as CSSProperties}
          className={i > 3 ? styles.darkBar : undefined}
        />
      ))}
    </div>
  );
}

export function Reconciled({ label }: { label: string }) {
  return (
    <small className={styles.checked}>
      <span className={styles.checkTile}>
        <svg viewBox="0 0 12 12" aria-hidden>
          <path d="M2 6.4 4.6 9 10 3.2" />
        </svg>
      </span>
      {label}
    </small>
  );
}

/* ==========================================================================
   Tally — numbers counting into place.

   Server-renders the final value, so the markup is correct with no JS and
   hydration never mismatches; the count only ever runs client-side, once,
   and never for reduced-motion users.
   ========================================================================== */

export function Tally({
  value,
  live,
  delay = 0,
}: {
  value: string;
  live: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!live || ran.current || !el || prefersReducedMotion()) return;
    ran.current = true;

    // Split any currency/sign prefix, the numerals, and a trailing unit ("%").
    const parsed = /^([^\d-]*)(-?[\d,]*\.?\d+)(.*)$/.exec(value);
    if (!parsed) return;
    const [, prefix, digits, suffix] = parsed;
    const target = Number(digits.replace(/,/g, ""));
    if (!Number.isFinite(target)) return;

    const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;
    const useGrouping = digits.includes(",");
    const format = (n: number) =>
      prefix +
      n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping,
      }) +
      suffix;

    let raf = 0;
    let start = 0;
    const duration = 1000;
    const step = (now: number) => {
      if (!start) start = now + delay;
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      el.textContent = format(target * (1 - (1 - t) ** 3));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    el.textContent = format(0);
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [live, value, delay]);

  return <span ref={ref}>{value}</span>;
}
