import { Section, Orb } from "@/components/layout/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Reveal } from "@/components/primitives/Reveal";
import { DrawLine } from "@/components/motion/DrawLine";
import { Spotlight } from "@/components/motion/Spotlight";
import type { SectionHeader as HeaderData, ProcessStep } from "@/lib/types";

/**
 * Process — four numbered steps on a line that draws itself left to right as
 * the section arrives, with the cards fading up behind it in sequence.
 */
export function Process({
  header,
  steps,
}: {
  header: HeaderData;
  steps: ProcessStep[];
}) {
  return (
    <Section
      id="process"
      ground="white"
      atmosphere={
        <Orb
          tone="gold"
          drift="b"
          className="left-[38%] top-[-30%] h-[560px] w-[560px] opacity-55 max-[900px]:hidden"
        />
      }
    >
      <SectionHeader data={header} className="mb-16 max-[767px]:mb-10" />

      <div className="relative">
        {/* The path the steps sit on. */}
        <div
          aria-hidden
          className="absolute left-0 right-0 top-[46px] hidden min-[901px]:block"
        >
          <DrawLine className="h-px w-full bg-gradient-to-r from-rule via-gold/50 to-rule" />
        </div>

        <div className="relative grid grid-cols-4 gap-6 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">
          {steps.map((step, i) => (
            <Reveal key={step._id} delay={i * 110} duration={800} className="h-full">
              <Spotlight
                as="article"
                className="card-surface group flex h-full flex-col gap-4 p-7 hover:shadow-[var(--shadow-gold)] max-[767px]:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="aura-light relative flex h-12 w-12 items-center justify-center rounded-btn border border-rule font-display text-[19px] font-medium text-brass transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:border-gold group-hover:shadow-[var(--glow-gold)]">
                    {step.index}
                  </span>
                  <span className="spec-label transition-colors duration-300 group-hover:text-brass">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="m-0 font-display text-[22px] font-semibold">{step.title}</h3>
                <p className="m-0 text-body text-slate">{step.description}</p>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
