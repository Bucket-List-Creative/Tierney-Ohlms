import { Button } from "@/components/primitives/Button";
import { MediaFrame } from "@/components/primitives/MediaFrame";
import { LineIcon } from "@/components/icons/LineIcon";
import { AnimatedStats } from "@/components/sections/AnimatedStats";
import { Orb } from "@/components/layout/Section";
import { Magnetic } from "@/components/motion/Magnetic";
import { Parallax } from "@/components/motion/Parallax";
import { TextReveal, FadeIn } from "@/components/motion/TextReveal";
import { Reveal } from "@/components/primitives/Reveal";
import heroPhoto from "@/assets/hero.jpg";
import type { HomePage, Highlight, Stat } from "@/lib/types";

/**
 * Hero — warm aura over white, two drifting lights, a word-by-word headline
 * reveal, and a photograph that parallaxes a little slower than the page.
 */
export function Hero({
  hero,
  stats,
  chip,
}: {
  hero: HomePage["hero"];
  stats: Stat[];
  chip?: Highlight;
}) {
  return (
    <section id="top" className="atmos aura-hero">
      {/* Ambient light */}
      <Orb
        tone="gold"
        drift="a"
        className="-right-[12%] -top-[38%] h-[780px] w-[780px] opacity-90 max-[980px]:h-[460px] max-[980px]:w-[460px]"
      />
      <Orb
        tone="bone"
        drift="b"
        className="-bottom-[46%] -left-[16%] h-[680px] w-[680px] max-[980px]:hidden"
      />

      <div className="container-x relative z-[1] pb-20 pt-20 max-[980px]:pb-14 max-[980px]:pt-14">
        <div className="grid grid-cols-[1.05fr_minmax(0,0.95fr)] items-center gap-16 max-[980px]:grid-cols-1 max-[980px]:gap-12">
          <div className="flex min-w-0 flex-col items-start gap-7">
            <Reveal variant="scale" duration={700}>
              <span className="group inline-flex items-center gap-2.5 rounded-full border border-rule bg-white/70 px-3.5 py-1.5 shadow-[var(--shadow-rest)] backdrop-blur-sm max-[560px]:gap-2 max-[560px]:px-3">
                <span
                  className="relative flex h-1.5 w-1.5 shrink-0 items-center justify-center"
                  aria-hidden
                >
                  <span className="absolute h-1.5 w-1.5 rotate-45 bg-gold" />
                  <span
                    className="absolute h-1.5 w-1.5 rotate-45 bg-gold"
                    style={{ animation: "pulse-ring 3.4s ease-out infinite" }}
                  />
                </span>
                <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brass max-[560px]:text-[10.5px] max-[560px]:tracking-[0.12em]">
                  {hero.eyebrow}
                </span>
              </span>
            </Reveal>

            <TextReveal
              as="h1"
              text={hero.heading}
              delay={80}
              step={60}
              className="m-0 max-w-[15ch] font-display text-hero text-ink"
            />

            <FadeIn
              delay={280}
              className="m-0 max-w-[52ch] text-lead text-slate"
            >
              {hero.lead}
            </FadeIn>

            <Reveal delay={400} duration={700} className="mt-1 w-full">
              {/* Below 520px the two actions go full width so neither reads as
                  the leftover of the other. */}
              <div className="flex flex-wrap items-center gap-3.5 max-[520px]:flex-col max-[520px]:items-stretch">
                <Magnetic strength={0.24} className="max-[520px]:block">
                  <Button
                    href={hero.primaryCta.href}
                    variant="primary"
                    className="max-[520px]:w-full"
                  >
                    {hero.primaryCta.label}
                    <LineIcon
                      name="arrow-right"
                      size={17}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </Button>
                </Magnetic>
                <Button
                  href={hero.secondaryCta.href}
                  variant="secondary"
                  className="max-[520px]:w-full"
                >
                  {hero.secondaryCta.label}
                </Button>
              </div>
            </Reveal>

            {/* Quiet proof points, woven into the copy as small words */}
            <Reveal delay={520} duration={700} className="mt-1 w-full">
              <div className="flex flex-col gap-4">
                <span className="rule-fade block w-full max-w-[420px] opacity-70" aria-hidden />
                <AnimatedStats stats={stats} variant="inline" />
              </div>
            </Reveal>
          </div>

          <div className="relative min-w-0">
            <Parallax strength={-46} minWidth={980}>
              <Reveal variant="mask" duration={1100} className="group relative">
                {/* Offset panel behind the photo — depth without a heavy shadow. */}
                <span
                  aria-hidden
                  className="absolute -bottom-6 -right-6 z-0 h-full w-full rounded-panel border border-gold/45 bg-goldwash max-[520px]:-bottom-3 max-[520px]:-right-3"
                />
                <div className="relative z-[1]">
                  <MediaFrame
                    image={hero.image}
                    fallback={heroPhoto}
                    alt="Financial documents and a calculator on a desk"
                    priority
                    zoom
                    overlay
                    sizes="(max-width: 980px) 100vw, 46vw"
                    className="h-[480px] w-full shadow-[var(--shadow-hover)] max-[980px]:h-[340px] max-[520px]:h-[260px]"
                  />
                </div>

                {chip ? (
                  <div className="float-y glass absolute bottom-5 left-5 z-[2] flex items-center gap-3 rounded-card px-4 py-3 max-[520px]:bottom-3 max-[520px]:left-3 max-[520px]:px-3 max-[520px]:py-2.5">
                    <span className="aura-light flex h-11 w-11 items-center justify-center rounded-btn border border-rule text-ink">
                      <LineIcon name={chip.icon} size={20} />
                    </span>
                    <span className="flex flex-col">
                      <span className="font-display text-lg leading-tight text-ink">
                        {chip.claim}
                      </span>
                      <span className="text-[13px] leading-tight text-slate">
                        {chip.caption}
                      </span>
                    </span>
                  </div>
                ) : null}
              </Reveal>
            </Parallax>
          </div>
        </div>
      </div>

      <div aria-hidden className="rule-fade absolute inset-x-0 bottom-0 z-[2]" />
    </section>
  );
}
