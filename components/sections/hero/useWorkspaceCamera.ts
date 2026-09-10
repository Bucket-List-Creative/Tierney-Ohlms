"use client";

import { useEffect, type RefObject } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
/** Cubic ease-out — arrivals. */
const outCubic = (t: number) => 1 - (1 - t) ** 3;
/**
 * Camera pushes. Deliberately gentle rather than ease-in-out: a symmetric
 * curve spends almost all of its travel in the middle of the range, which
 * flings the whole workspace off screen within the first flick of the wheel.
 * This keeps the desk composed while the visitor is still reading it.
 */
const push = (t: number) => t ** 1.7;

/** A window of the scroll timeline, mapped to 0..1. */
const span = (p: number, from: number, to: number) => clamp01((p - from) / (to - from));

export type ChapterRefs = readonly [RefObject<HTMLElement | null>, RefObject<HTMLElement | null>];

/**
 * The one animation loop behind the hero.
 *
 * It owns two inputs — scroll progress through the runway and an inertial
 * pointer — and publishes both as CSS custom properties. Every position,
 * rotation, depth and opacity in HeroWorkspace.module.css is a `calc()` off
 * these; nothing here touches an individual document.
 *
 * The loop is demand-driven: scroll and pointermove queue a frame, and the
 * pointer lerp keeps requesting frames only until it has settled. At rest the
 * hero costs nothing.
 *
 * Returns nothing. `onChapter` fires when the camera reaches a chapter, which
 * is what arms that chapter's once-only micro-interactions.
 */
export function useWorkspaceCamera({
  runwayRef,
  viewportRef,
  panelRefs,
  onChapter,
}: {
  runwayRef: RefObject<HTMLElement | null>;
  viewportRef: RefObject<HTMLElement | null>;
  panelRefs: ChapterRefs;
  onChapter: (index: 0 | 1) => void;
}) {
  useEffect(() => {
    const runway = runwayRef.current;
    const viewport = viewportRef.current;
    const panelA = panelRefs[0].current;
    const panelB = panelRefs[1].current;
    if (!runway || !viewport || !panelA || !panelB) return;

    // Reduced motion: the stylesheet already lays both chapters out statically.
    // Arm both so nothing stays hidden, then stay out of the way entirely.
    if (prefersReducedMotion()) {
      onChapter(0);
      onChapter(1);
      return;
    }

    const fine = hasFinePointer();
    let raf = 0;
    // Eased pointer (px/py) chasing the raw pointer (tx/ty), both -1..1.
    let px = 0;
    let py = 0;
    let tx = 0;
    let ty = 0;
    let reachedB = false;
    let scrollSpan = 1;
    let stickyTop = 0;

    const measure = () => {
      stickyTop =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--header-h"),
        ) || 0;
      scrollSpan = Math.max(1, runway.offsetHeight - viewport.offsetHeight);
    };

    const set = (el: HTMLElement, name: string, value: string) =>
      el.style.setProperty(name, value);

    const frame = () => {
      raf = 0;

      px += (tx - px) * 0.085;
      py += (ty - py) * 0.085;
      const settling = Math.abs(tx - px) > 0.0008 || Math.abs(ty - py) > 0.0008;

      const rect = runway.getBoundingClientRect();
      const p = clamp01((stickyTop - rect.top) / scrollSpan);

      set(viewport, "--px", px.toFixed(4));
      set(viewport, "--py", py.toFixed(4));

      // Skip the timeline maths while the hero is off screen; the pointer
      // channels above are cheap and keep the scene coherent on return.
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        // -- Chapter A: settled desk, then the camera pushes through it -----
        const aAdvance = span(p, 0, 0.5);
        const aPush = push(aAdvance);
        set(panelA, "--dolly", `${(aPush * 540).toFixed(1)}px`);
        set(panelA, "--spread", aPush.toFixed(4));
        // CHAOS -> CLARITY. 1 is the scattered desk, 0.12 is the tidy grid.
        // Near-linear on purpose: an ease-out here resolves the whole desk
        // inside the first flick of the wheel, and the metaphor is the point.
        set(panelA, "--scatter", (1 - aAdvance ** 1.2 * 0.88).toFixed(4));
        set(panelA, "--fade", (1 - span(p, 0.34, 0.48)).toFixed(4));
        set(panelA, "--copyFade", (1 - span(p, 0.28, 0.42)).toFixed(4));
        set(panelA, "--copyRise", `${(aPush * -46).toFixed(1)}px`);
        set(panelA, "--copyScale", (1 + aPush * 0.06).toFixed(4));

        // -- Chapter B: rises out of deep space already organised ----------
        // Its arrival overlaps chapter A's exit, so the visitor is never
        // looking at an empty frame between the two.
        const bArrive = outCubic(span(p, 0.4, 0.6));
        const bAdvance = span(p, 0.4, 1);
        const bExit = push(span(p, 0.86, 1));
        set(panelB, "--dolly", `${((1 - bArrive) * -780 + bExit * 520).toFixed(1)}px`);
        set(panelB, "--spread", bExit.toFixed(4));
        set(panelB, "--scatter", (0.34 - outCubic(bAdvance) * 0.3).toFixed(4));
        set(panelB, "--fade", (bArrive * (1 - bExit * 0.85)).toFixed(4));
        set(
          panelB,
          "--copyFade",
          (span(p, 0.48, 0.6) * (1 - span(p, 0.88, 1))).toFixed(4),
        );
        set(panelB, "--copyRise", `${(bExit * -40).toFixed(1)}px`);
        set(panelB, "--copyScale", (1 + bExit * 0.05).toFixed(4));

        // -- Shared layers --------------------------------------------------
        // Foreground papers sweep past the viewer first and do not come back.
        // They outlive the fade window's midpoint so the sweep reads as paper
        // passing the lens rather than paper switching itself off.
        set(viewport, "--fgDolly", `${(push(span(p, 0, 0.4)) * 540).toFixed(1)}px`);
        set(viewport, "--fgFade", (1 - span(p, 0.16, 0.38)).toFixed(4));
        set(viewport, "--gDolly", `${(p * 140).toFixed(1)}px`);
        set(viewport, "--clarity", outCubic(p).toFixed(4));
        set(viewport, "--exit", span(p, 0.88, 1).toFixed(4));
        set(viewport, "--cueFade", (1 - span(p, 0.02, 0.1)).toFixed(4));

        // Chapter two arms its micro-interactions as it comes into view, and
        // stays armed: they are meant to be discovered once, not replayed.
        if (!reachedB && p > 0.38) {
          reachedB = true;
          onChapter(1);
        }
      }

      if (settling) queue();
    };

    const queue = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    // Viewport centre is (0, 0); each edge is 1. Clamped, because a pointer
    // can leave the window mid-drag and report coordinates outside it.
    const onPointer = (e: PointerEvent) => {
      tx = clamp01(e.clientX / window.innerWidth) * 2 - 1;
      ty = clamp01(e.clientY / window.innerHeight) * 2 - 1;
      queue();
    };

    const onResize = () => {
      measure();
      queue();
    };

    measure();
    frame();
    // Two frames of settle before the entrance runs, so the paper stack does
    // not animate against a layout that is still resolving webfonts.
    const armed = requestAnimationFrame(() => requestAnimationFrame(() => onChapter(0)));

    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    if (fine) window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(armed);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
    };
    // Refs are stable and `onChapter` is memoised by the caller.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
