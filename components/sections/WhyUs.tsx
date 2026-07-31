import { Section } from "@/components/layout/Section";
import { Button } from "@/components/primitives/Button";
import { IconTile } from "@/components/primitives/IconTile";
import type { SectionHeader as HeaderData, Feature } from "@/lib/types";

/**
 * Why Tierney & Ohlms — bone ground, sticky intro column, 2-col feature grid.
 * Each feature is an icon-tile card so the section reads as designed, not a
 * bare list.
 */
export function WhyUs({
  header,
  features,
}: {
  header: HeaderData;
  features: Feature[];
}) {
  return (
    <Section id="why" ground="gold" ruleTop ruleBottom>
      <div className="grid grid-cols-[.85fr_1.15fr] items-start gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-10">
        <div className="sticky top-[120px] flex flex-col gap-5 max-[900px]:static">
          {header.eyebrow ? <span className="eyebrow">{header.eyebrow}</span> : null}
          <h2 className="m-0 font-display text-h2 max-[767px]:text-[30px]">{header.heading}</h2>
          {header.lead ? (
            <p className="m-0 text-[17px] leading-relaxed text-slate">{header.lead}</p>
          ) : null}
          <Button href="/#contact" variant="secondary" className="mt-2 self-start">
            Get Started
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
          {features.map((feature) => (
            <div
              key={feature._id}
              className="group flex flex-col gap-3.5 rounded-card border border-rule bg-white p-6 transition-all duration-[250ms] ease-out hover:-translate-y-[2px] hover:border-gold hover:shadow-[var(--shadow-gold)]"
            >
              <IconTile icon={feature.icon} tile={44} size={20} />
              <h3 className="m-0 text-[17px] font-semibold text-ink">{feature.title}</h3>
              <p className="m-0 text-body text-slate">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
