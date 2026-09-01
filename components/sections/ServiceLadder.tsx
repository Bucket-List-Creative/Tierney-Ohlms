"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/primitives/Button";
import { LineIcon } from "@/components/icons/LineIcon";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/types";

/** Scroll distance each service holds the stage, as a fraction of the viewport. */
const STOP = 0.62;
const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * The service ladder as a full-bleed scroll story: the stage is pinned while
 * each service takes it in turn — the title lands first, then its copy and
 * link fade up under it — and a floating side tab swaps the whole section for
 * a grid of everything at once.
 *
 * The runway is a tall spacer; nothing here animates layout, only opacity and
 * transform. Reduced motion gets the grid, which is the same content without
 * the pinning.
 */
export function ServiceLadder({ services }: { services: Service[] }) {
  const [showAll, setShowAll] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const runwayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLSpanElement>(null);

  // Read the preference in an effect so the first client render matches SSR.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const grid = showAll || reduced;

  useEffect(() => {
    if (grid || services.length === 0) return;
    const runway = runwayRef.current;
    const stage = stageRef.current;
    if (!runway || !stage) return;

    let raf = 0;
    let last = -1;

    const apply = () => {
      raf = 0;
      const rect = runway.getBoundingClientRect();
      const travel = rect.height - stage.offsetHeight;
      const p = travel <= 0 ? 0 : clamp01(-rect.top / travel);
      // Position along the ladder, in service units.
      const t = p * services.length;

      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;
        const d = t - i;
        const onStage = d > -0.35 && d < 1.15;
        panel.style.visibility = onStage ? "visible" : "hidden";
        if (!onStage) return;

        // The exit ramp is shared by the whole panel; the entrance is
        // staggered per line, so the title arrives before its copy.
        const exit = clamp01((d - 0.86) / 0.14);
        panel.querySelectorAll<HTMLElement>("[data-lift]").forEach((el, k) => {
          const enter = clamp01((d - k * 0.04) / 0.12);
          el.style.opacity = String(Math.min(enter, 1 - exit));
          el.style.transform = `translate3d(0,${(1 - enter) * 30 - exit * 22}px,0)`;
        });

        // Only the panel holding the stage may be reached or read.
        const held = d >= 0 && d < 1;
        panel.inert = !held;
      });

      const next = Math.min(services.length - 1, Math.max(0, Math.floor(t)));
      if (next !== last) {
        last = next;
        setActive(next);
      }
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${p})`;
      }
    };

    const queue = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue, { passive: true });
    apply();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [grid, services.length]);

  /** Jump the runway to a given service's hold. */
  const goTo = useCallback(
    (i: number) => {
      const runway = runwayRef.current;
      const stage = stageRef.current;
      if (!runway || !stage) return;
      const travel = runway.offsetHeight - stage.offsetHeight;
      const top =
        runway.getBoundingClientRect().top +
        window.scrollY +
        (travel * (i + 0.4)) / services.length;
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    },
    [reduced, services.length],
  );

  /** Swapping modes changes the section's height enormously — hold the top. */
  const toggle = useCallback(() => {
    setShowAll((v) => !v);
    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
    });
  }, []);

  if (services.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="ladder"
      aria-label="The service ladder"
      className="relative mesh-dark border-y border-white/10 text-white"
    >
      {/* Floating mode toggle — rides alongside the section in both modes. */}
      <div className="pointer-events-none absolute inset-y-0 right-6 z-30 max-[980px]:hidden">
        <div className="sticky top-[46svh]">
          <button
            type="button"
            onClick={toggle}
            aria-pressed={grid}
            className="float-y pointer-events-auto inline-flex items-center gap-2.5 rounded-full border border-gold/45 bg-white/[.06] px-3 py-5 font-mono text-[11px] uppercase tracking-[.14em] text-gold backdrop-blur-sm transition-colors duration-300 [writing-mode:vertical-rl] hover:border-gold hover:bg-gold/15 hover:text-white"
          >
            <LineIcon
              name={grid ? "arrow-up-right" : "arrow-right"}
              size={14}
              className="rotate-90"
            />
            {grid ? "Back to the ladder" : "Show all services"}
          </button>
        </div>
      </div>

      {grid ? (
        <GridView services={services} onToggle={toggle} reduced={reduced} />
      ) : (
        <div
          ref={runwayRef}
          style={{ height: `calc(100svh + ${services.length * STOP * 100}svh)` }}
        >
          <div
            ref={stageRef}
            className="sticky top-[var(--header-h)] flex h-[calc(100svh-var(--header-h))] flex-col overflow-hidden"
          >
            {/* Persistent section header */}
            <div className="container-x flex shrink-0 flex-col items-center gap-2 pt-9 text-center max-[767px]:pt-7">
              <span className="eyebrow text-gold">The service ladder</span>
              <p className="m-0 max-w-[46ch] text-[14px] leading-relaxed text-dark-body max-[767px]:text-[13px]">
                The order below reflects how businesses grow with us. Start where you
                are today, and add the next rung when you&rsquo;re ready.
              </p>
            </div>

            {/* Stage */}
            <div className="relative flex-1">
              {services.map((service, i) => (
                <div
                  key={service._id}
                  ref={(node) => {
                    panelsRef.current[i] = node;
                  }}
                  style={{ visibility: i === 0 ? "visible" : "hidden" }}
                  className="container-x absolute inset-0 flex flex-col items-center justify-center gap-5 text-center"
                >
                  <span
                    data-lift
                    style={{ opacity: i === 0 ? 1 : 0 }}
                    className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.14em] text-gold"
                  >
                    {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                    {service.topTier ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-gold px-2.5 py-1 text-[10px]">
                        <LineIcon name="star" size={11} />
                        Most popular
                      </span>
                    ) : null}
                  </span>

                  <h3
                    data-lift
                    style={{ opacity: i === 0 ? 1 : 0 }}
                    className="m-0 max-w-[18ch] font-display text-[clamp(30px,4.4vw,58px)] font-medium leading-[1.08]"
                  >
                    <LastWordEmphasis text={service.title} />
                  </h3>

                  {service.tagline ? (
                    <p
                      data-lift
                      style={{ opacity: i === 0 ? 1 : 0 }}
                      className="m-0 max-w-[34ch] font-display text-[clamp(17px,1.9vw,23px)] italic leading-snug text-gold"
                    >
                      {service.tagline}
                    </p>
                  ) : null}

                  <p
                    data-lift
                    style={{ opacity: i === 0 ? 1 : 0 }}
                    className="m-0 max-w-[62ch] text-[15.5px] leading-relaxed text-dark-body max-[767px]:text-[14.5px]"
                  >
                    {service.detail ?? service.description}
                  </p>

                  <span data-lift style={{ opacity: i === 0 ? 1 : 0 }} className="mt-2">
                    <Button href={`/services/${service.slug}`} variant="inverse" size="sm">
                      Explore {service.title}
                      <LineIcon name="arrow-right" size={15} />
                    </Button>
                  </span>
                </div>
              ))}
            </div>

            {/* Rail + progress */}
            <div className="container-x flex shrink-0 flex-col items-center gap-4 pb-9 max-[767px]:pb-7">
              <ol className="m-0 flex list-none flex-wrap items-center justify-center gap-2.5 p-0">
                {services.map((service, i) => (
                  <li key={service._id}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={i === active ? "true" : undefined}
                      className={cn(
                        "rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-[.12em] transition-all duration-300",
                        i === active
                          ? "border-gold bg-gold/15 text-gold"
                          : "border-white/15 text-white/45 hover:border-white/40 hover:text-white/80",
                      )}
                    >
                      <span className="sr-only">Go to </span>
                      {String(i + 1).padStart(2, "0")}
                      <span className="sr-only">, {service.title}</span>
                    </button>
                  </li>
                ))}
              </ol>

              <div className="h-px w-[240px] overflow-hidden bg-white/15">
                <span
                  ref={progressRef}
                  className="block h-full origin-left scale-x-0 bg-gradient-to-r from-brass to-gold"
                />
              </div>

              <button
                type="button"
                onClick={toggle}
                className="mt-1 hidden items-center gap-2 rounded-full border border-gold/45 bg-white/[.06] px-4 py-2 font-mono text-[11px] uppercase tracking-[.14em] text-gold transition-colors duration-300 hover:border-gold hover:text-white max-[980px]:inline-flex"
              >
                Show all services
                <LineIcon name="arrow-right" size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/** All services at once — the same content without the pinning. */
function GridView({
  services,
  onToggle,
  reduced,
}: {
  services: Service[];
  onToggle: () => void;
  reduced: boolean;
}) {
  return (
    <div className="container-x py-24 max-[767px]:py-16">
      <header className="mb-12 flex max-w-[620px] flex-col gap-4">
        <span className="eyebrow text-gold">The service ladder</span>
        <h2 className="m-0 font-display text-[clamp(28px,3vw,40px)] font-medium leading-[1.14]">
          Everything, <em className="gradient-text-dark">at once.</em>
        </h2>
        <p className="m-0 text-[15.5px] leading-relaxed text-dark-body">
          The order reflects how businesses grow with us. Start where you are today, and
          add the next rung when you&rsquo;re ready.
        </p>
        {!reduced ? (
          <button
            type="button"
            onClick={onToggle}
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-gold/45 bg-white/[.06] px-4 py-2 font-mono text-[11px] uppercase tracking-[.14em] text-gold transition-colors duration-300 hover:border-gold hover:text-white max-[980px]:inline-flex min-[981px]:hidden"
          >
            Back to the ladder
            <LineIcon name="arrow-right" size={14} />
          </button>
        ) : null}
      </header>

      <div className="grid grid-cols-3 gap-5 max-[980px]:grid-cols-2 max-[640px]:grid-cols-1">
        {services.map((service, i) => (
          <Link
            key={service._id}
            href={`/services/${service.slug}`}
            className={cn(
              "group flex h-full flex-col gap-3.5 rounded-panel border p-7 transition duration-300 hover:-translate-y-[3px]",
              service.topTier
                ? "border-gold/45 bg-gold/[.07] hover:border-gold"
                : "border-white/14 bg-white/[.04] hover:border-gold/60 hover:bg-white/[.07]",
            )}
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-btn border border-dark-border bg-white/5 text-gold transition-colors duration-500 group-hover:border-gold/70 group-hover:bg-gold/10">
                <LineIcon name={service.icon} size={19} />
              </span>
              {/* The rung number always shows — it is what the ladder is for. */}
              <span className="font-mono text-[10px] uppercase tracking-[.14em] text-dark-label">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            {service.topTier ? (
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-gold px-2.5 py-1 font-mono text-[10px] uppercase tracking-[.12em] text-gold">
                <LineIcon name="star" size={11} />
                Most popular
              </span>
            ) : null}
            <h3 className="m-0 font-display text-[19px] font-semibold">{service.title}</h3>
            <p className="m-0 text-[14px] leading-relaxed text-dark-body">
              {service.description}
            </p>
            <span className="link-line mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-[12px] font-semibold uppercase tracking-[.08em] text-gold transition-colors duration-300 group-hover:text-white">
              Explore service
              <LineIcon
                name="arrow-right"
                size={14}
                className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
              />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/** The site's closing-phrase emphasis, applied to a multi-word service title. */
function LastWordEmphasis({ text }: { text: string }) {
  const words = text.split(" ");
  if (words.length < 2) return <>{text}</>;
  return (
    <>
      {words.slice(0, -1).join(" ")}{" "}
      <em className="gradient-text-dark">{words.at(-1)}</em>
    </>
  );
}
