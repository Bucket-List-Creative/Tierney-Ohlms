import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Accordion } from "@/components/primitives/Accordion";
import { LineIcon } from "@/components/icons/LineIcon";
import type { SectionHeader as HeaderData, FaqItem } from "@/lib/types";

/**
 * FAQ — editorial two-column layout: sticky intro on the left, accordion of
 * genuine Q&As on the right. Replaces the fabricated testimonials section.
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
    <Section id="faq" ground="white" ruleTop>
      <div className="grid grid-cols-[.8fr_1.2fr] items-start gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-8">
        <div className="sticky top-[120px] flex flex-col gap-5 max-[900px]:static">
          {header.eyebrow ? <span className="eyebrow">{header.eyebrow}</span> : null}
          <h2 className="m-0 font-display text-h2 max-[767px]:text-[30px]">{header.heading}</h2>
          {header.lead ? (
            <p className="m-0 text-[17px] leading-relaxed text-slate">{header.lead}</p>
          ) : null}
          <Link
            href="/#contact"
            className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-brass transition-colors hover:text-ink"
          >
            Still have questions? Contact us
            <LineIcon name="arrow-right" size={15} />
          </Link>
        </div>

        <Accordion items={items} />
      </div>
    </Section>
  );
}
