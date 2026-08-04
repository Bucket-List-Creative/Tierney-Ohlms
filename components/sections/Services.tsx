import { Section, Orb } from "@/components/layout/Section";
import { Button } from "@/components/primitives/Button";
import { IconTile } from "@/components/primitives/IconTile";
import { LineIcon } from "@/components/icons/LineIcon";
import { Reveal } from "@/components/primitives/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { SpotlightLink } from "@/components/motion/Spotlight";
import type { SectionHeader as HeaderData, Service } from "@/lib/types";

/**
 * Services — editorial two-column layout: a sticky intro beside a panel of
 * numbered service rows. Each row carries a pointer-tracked warm highlight and
 * slides its title toward the arrow on hover.
 */
export function Services({
  header,
  services,
}: {
  header: HeaderData;
  services: Service[];
}) {
  return (
    <Section
      id="services"
      ground="quiet"
      atmosphere={
        <>
          <Orb
            tone="gold"
            drift="b"
            className="-left-[18%] top-[8%] h-[560px] w-[560px] opacity-70 max-[900px]:hidden"
          />
          <Orb tone="ink" className="-right-[10%] bottom-[4%] h-[420px] w-[420px] max-[900px]:hidden" />
        </>
      }
    >
      <div className="grid grid-cols-[.8fr_1.2fr] items-start gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-9">
        <div className="sticky top-[calc(var(--header-h)+40px)] flex flex-col gap-5 max-[900px]:static">
          {header.eyebrow ? (
            <Reveal variant="left" duration={700}>
              <span className="eyebrow eyebrow-rule">{header.eyebrow}</span>
            </Reveal>
          ) : null}
          <TextReveal
            text={header.heading}
            className="m-0 font-display text-h2 text-ink"
          />
          {header.lead ? (
            <Reveal delay={160} duration={800}>
              <p className="m-0 text-lead leading-relaxed text-slate">{header.lead}</p>
            </Reveal>
          ) : null}
          <Reveal delay={260} duration={800} className="mt-2">
            <Button href="/services" variant="secondary" className="self-start">
              View all services
              <LineIcon
                name="arrow-right"
                size={16}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </Button>
          </Reveal>
        </div>

        <div className="overflow-hidden rounded-panel border border-rule bg-white/70 shadow-[var(--shadow-rest)] backdrop-blur-sm">
          {services.map((service, i) => (
            <Reveal
              key={service._id}
              delay={i * 70}
              duration={800}
              className="border-t border-rule first:border-t-0"
            >
              <SpotlightLink
                href="/services"
                className="group flex items-center gap-5 px-6 py-6 transition-colors duration-300 hover:bg-white max-[520px]:flex-col max-[520px]:items-start max-[520px]:gap-3 max-[520px]:px-5"
              >
                <span className="w-7 shrink-0 font-mono text-[13px] font-medium tracking-[0.1em] text-brass transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <IconTile icon={service.icon} tile={46} size={20} />
                <span className="flex min-w-0 flex-1 flex-col gap-1 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                  <span className="font-display text-[20px] font-semibold text-ink">
                    {service.title}
                  </span>
                  <span className="text-[15px] leading-relaxed text-slate">
                    {service.description}
                  </span>
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-transparent text-stroke transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-gold/40 group-hover:bg-white group-hover:text-brass group-hover:shadow-[var(--glow-gold)] max-[520px]:hidden">
                  <LineIcon
                    name="arrow-right"
                    size={18}
                    className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
                  />
                </span>
              </SpotlightLink>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
