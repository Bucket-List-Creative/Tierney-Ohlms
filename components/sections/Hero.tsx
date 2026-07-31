import { Button } from "@/components/primitives/Button";
import { MediaFrame } from "@/components/primitives/MediaFrame";
import { LineIcon } from "@/components/icons/LineIcon";
import { AnimatedStats } from "@/components/sections/AnimatedStats";
import heroPhoto from "@/assets/hero.jpg";
import type { HomePage, Highlight, Stat } from "@/lib/types";

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
    <section id="top" className="aura-hero overflow-hidden border-b border-rule">
      <div className="container-x pb-16 pt-20 max-[980px]:pb-12 max-[980px]:pt-14">
        <div className="grid grid-cols-[1.05fr_minmax(0,0.95fr)] items-center gap-14 max-[980px]:grid-cols-1 max-[980px]:gap-10">
          <div className="flex min-w-0 flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-rule bg-white/70 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden />
              <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brass">
                {hero.eyebrow}
              </span>
            </span>

            <h1 className="m-0 max-w-[15ch] font-display text-[54px] leading-[1.08] max-[1100px]:text-[46px] max-[767px]:text-[36px]">
              {hero.heading}
            </h1>

            <p className="m-0 max-w-[52ch] text-lead text-slate">{hero.lead}</p>

            <div className="mt-1 flex flex-wrap gap-3.5">
              <Button href={hero.primaryCta.href} variant="primary">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </Button>
            </div>

            {/* Quiet proof points, woven into the copy as small words */}
            <AnimatedStats stats={stats} variant="inline" className="mt-2" />
          </div>

          <div className="relative min-w-0">
            <MediaFrame
              image={hero.image}
              fallback={heroPhoto}
              alt="Financial documents and a calculator on a desk"
              priority
              sizes="(max-width: 980px) 100vw, 46vw"
              className="h-[460px] w-full max-[980px]:h-[320px] max-[520px]:h-[240px]"
            />
            {chip ? (
              <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-card border border-rule bg-white/95 px-4 py-3 shadow-[var(--shadow-hover)] backdrop-blur-sm">
                <span className="aura-light flex h-11 w-11 items-center justify-center rounded-btn border border-rule text-ink">
                  <LineIcon name={chip.icon} size={20} />
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-lg leading-tight text-ink">{chip.claim}</span>
                  <span className="text-[13px] leading-tight text-slate">{chip.caption}</span>
                </span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
