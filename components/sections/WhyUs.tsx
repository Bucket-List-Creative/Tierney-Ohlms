import { Section, Orb } from "@/components/layout/Section";
import { Button } from "@/components/primitives/Button";
import { IconTile } from "@/components/primitives/IconTile";
import { LineIcon } from "@/components/icons/LineIcon";
import { Reveal } from "@/components/primitives/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Spotlight } from "@/components/motion/Spotlight";
import type { SectionHeader as HeaderData, Feature } from "@/lib/types";

/**
 * Why Tierney & Ohlms — the warm gold ground, a sticky intro column, and a
 * 2-up grid of feature cards that lift into a gold halo on hover.
 */
export function WhyUs({
  header,
  features,
}: {
  header: HeaderData;
  features: Feature[];
}) {
  return (
    <Section
      id="why"
      ground="gold"
      ruleTop
      ruleBottom
      atmosphere={
        <>
          <Orb
            tone="gold"
            drift="a"
            className="-right-[14%] -top-[24%] h-[620px] w-[620px] opacity-80 max-[900px]:hidden"
          />
          <Orb
            tone="bone"
            drift="b"
            className="-bottom-[30%] left-[-12%] h-[520px] w-[520px] opacity-80 max-[900px]:hidden"
          />
        </>
      }
    >
      <div className="grid grid-cols-[.85fr_1.15fr] items-start gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-10">
        <div className="sticky top-[calc(var(--header-h)+40px)] flex flex-col gap-5 max-[900px]:static">
          {header.eyebrow ? (
            <Reveal variant="left" duration={700}>
              <span className="eyebrow eyebrow-rule">{header.eyebrow}</span>
            </Reveal>
          ) : null}
          <TextReveal text={header.heading} className="m-0 font-display text-h2 text-ink" />
          {header.lead ? (
            <Reveal delay={160} duration={800}>
              <p className="m-0 text-lead leading-relaxed text-slate">{header.lead}</p>
            </Reveal>
          ) : null}
          <Reveal delay={260} duration={800} className="mt-2">
            <Button href="/#contact" variant="secondary" className="self-start">
              Get Started
              <LineIcon
                name="arrow-right"
                size={16}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </Button>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
          {features.map((feature, i) => (
            <Reveal
              key={feature._id}
              variant="scale"
              delay={i * 80}
              duration={800}
              className="h-full"
            >
              <Spotlight className="card-surface group flex h-full flex-col gap-3.5 p-6 hover:shadow-[var(--shadow-gold)]">
                <IconTile icon={feature.icon} tile={44} size={20} />
                <h3 className="m-0 text-[17px] font-semibold text-ink">{feature.title}</h3>
                <p className="m-0 text-body text-slate">{feature.description}</p>
                {/* Hairline that fills toward the corner as the card warms. */}
                <span
                  aria-hidden
                  className="mt-auto block h-px w-8 origin-left scale-x-100 bg-gradient-to-r from-gold to-transparent transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-[3.4]"
                />
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
