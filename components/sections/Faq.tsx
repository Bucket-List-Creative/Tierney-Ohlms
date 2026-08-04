import Link from "next/link";
import { Section, Orb } from "@/components/layout/Section";
import { Accordion } from "@/components/primitives/Accordion";
import { LineIcon } from "@/components/icons/LineIcon";
import { Reveal } from "@/components/primitives/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import type { SectionHeader as HeaderData, FaqItem } from "@/lib/types";

/**
 * FAQ — editorial two-column layout: sticky intro on the left, accordion of
 * genuine Q&As on the right.
 */
export function Faq({
  header,
  faqs,
}: {
  header: HeaderData;
  faqs: FaqItem[];
}) {
  const items = faqs.map((f) => ({ question: f.question, answer: f.answer }));

  return (
    <Section
      id="faq"
      ground="quiet"
      ruleTop
      atmosphere={
        <Orb
          tone="gold"
          drift="a"
          className="-right-[16%] top-[18%] h-[520px] w-[520px] opacity-60 max-[900px]:hidden"
        />
      }
    >
      <div className="grid grid-cols-[.8fr_1.2fr] items-start gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-8">
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
          <Reveal delay={260} duration={800}>
            <Link
              href="/#contact"
              className="link-line mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-brass transition-colors duration-300 hover:text-ink"
            >
              Still have questions? Contact us
              <LineIcon name="arrow-right" size={15} />
            </Link>
          </Reveal>
        </div>

        <Reveal variant="blur" duration={900}>
          <Accordion items={items} />
        </Reveal>
      </div>
    </Section>
  );
}
