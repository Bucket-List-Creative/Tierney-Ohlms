import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { LineIcon } from "@/components/icons/LineIcon";
import type { SectionHeader as HeaderData, ProcessStep } from "@/lib/types";

/**
 * Process — 4 numbered step cards that lift and warm to gold on hover, with a
 * chevron between them tracing the path from one step to the next.
 */
export function Process({
  header,
  steps,
}: {
  header: HeaderData;
  steps: ProcessStep[];
}) {
  return (
    <Section id="process" ground="white" ruleTop>
      <SectionHeader data={header} className="mb-16" />
      <div className="grid grid-cols-4 gap-6 max-[900px]:grid-cols-2 max-[900px]:gap-6 max-[520px]:grid-cols-1">
        {steps.map((step, i) => (
          <div key={step._id} className="relative">
            <article className="group flex h-full flex-col gap-4 rounded-card border border-rule bg-white p-7 transition-all duration-[250ms] ease-out hover:-translate-y-[3px] hover:border-gold hover:shadow-[var(--shadow-gold)] max-[767px]:p-6">
              <div className="flex items-center justify-between">
                <span className="aura-light flex h-12 w-12 items-center justify-center rounded-btn border border-rule font-display text-[19px] font-medium text-brass">
                  {step.index}
                </span>
                <span className="spec-label">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="m-0 font-display text-[22px] font-semibold">{step.title}</h3>
              <p className="m-0 text-body text-slate">{step.description}</p>
            </article>

            {/* Chevron tracing the path to the next step (desktop only) */}
            {i < steps.length - 1 ? (
              <span
                className="absolute -right-[20px] top-[44px] z-10 text-stroke max-[900px]:hidden"
                aria-hidden
              >
                <LineIcon name="arrow-right" size={16} />
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
