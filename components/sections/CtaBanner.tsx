import { Button } from "@/components/primitives/Button";
import { LineIcon } from "@/components/icons/LineIcon";
import { Orb } from "@/components/layout/Section";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/primitives/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import type { HomePage } from "@/lib/types";

/**
 * Closing CTA — the black signature surface, lit by two slow gold auroras.
 *
 * `secondaryCta` adds an outlined companion action (e.g. "Call us"), and
 * `notes` renders a small reassurance row of check-marked points beneath the
 * buttons.
 */
export function CtaBanner({
  banner,
  eyebrow = "Get started",
  secondaryCta,
  notes,
}: {
  banner: HomePage["ctaBanner"];
  eyebrow?: string;
  secondaryCta?: { label: string; href: string };
  notes?: string[];
}) {
  return (
    <section className="atmos mesh-dark">
      <Orb
        tone="gold"
        drift="a"
        className="left-[8%] top-[-40%] h-[620px] w-[620px] opacity-70 max-[767px]:h-[380px] max-[767px]:w-[380px]"
      />
      <Orb
        tone="gold"
        drift="b"
        className="bottom-[-46%] right-[4%] h-[560px] w-[560px] opacity-50 max-[767px]:hidden"
      />

      <div className="container-x relative z-[1] flex flex-col items-center gap-6 py-[112px] text-center max-[767px]:py-[72px]">
        <Reveal variant="scale" duration={700}>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 font-mono text-[12px] uppercase tracking-[0.18em] text-gold backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>

        <TextReveal
          text={banner.heading}
          delay={60}
          className="m-0 max-w-[20ch] font-display text-display font-medium text-white"
        />

        <Reveal delay={220} duration={800}>
          <p className="m-0 max-w-[52ch] text-lead leading-relaxed text-dark-body">
            {banner.lead}
          </p>
        </Reveal>

        <Reveal delay={340} duration={800} className="mt-2">
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <Magnetic strength={0.24}>
              <Button href={banner.cta.href} variant="inverse">
                {banner.cta.label}
                <LineIcon
                  name="arrow-right"
                  size={17}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Button>
            </Magnetic>
            {secondaryCta ? (
              <Button href={secondaryCta.href} variant="inverse-outline">
                {secondaryCta.label}
              </Button>
            ) : null}
          </div>
        </Reveal>

        {notes?.length ? (
          <ul className="m-0 mt-3 flex list-none flex-wrap items-center justify-center gap-x-6 gap-y-2 p-0">
            {notes.map((note, i) => (
              <Reveal as="li" key={note} delay={440 + i * 80} duration={700}>
                <span className="flex items-center gap-2 text-[13px] text-dark-label">
                  <LineIcon name="check" size={14} className="text-gold" />
                  {note}
                </span>
              </Reveal>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
