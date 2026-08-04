"use client";

import { useEffect, useRef, useState } from "react";

/** True when the user (or their OS) has asked for reduced motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/** True for mouse/trackpad pointers — the only ones that can hover precisely. */
export function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(hover: hover) and (pointer: fine)").matches ?? false;
}

/**
 * Fires once when the element first crosses into view. Falls back to "shown"
 * immediately when IntersectionObserver is missing or motion is reduced, and
 * keeps a timeout safety net so content can never stay stuck hidden.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(options?: {
  rootMargin?: string;
  threshold?: number;
  /** Skip observation entirely and report in view on mount. */
  disabled?: boolean;
}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  const { rootMargin = "0px 0px -10% 0px", threshold = 0, disabled = false } =
    options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (disabled || typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(id);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold },
    );
    io.observe(el);

    // Safety net: never leave content permanently hidden if the observer
    // doesn't fire (odd layout, print, headless capture).
    const fallback = window.setTimeout(() => setInView(true), 1800);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [rootMargin, threshold, disabled]);

  return { ref, inView };
}

/**
 * Subscribes to scroll with a rAF gate, so handlers run at most once per frame
 * no matter how fast the wheel spins. Returns nothing; the callback owns the
 * writes (and should only ever write transforms/opacity).
 */
export function useRafScroll(onFrame: () => void, enabled = true) {
  const cb = useRef(onFrame);

  // Keep the latest callback without re-subscribing the listener each render.
  useEffect(() => {
    cb.current = onFrame;
  }, [onFrame]);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let queued = false;
    const run = () => {
      queued = false;
      cb.current();
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(run);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);
}
