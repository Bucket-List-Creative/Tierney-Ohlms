import { Section } from "@/components/layout/Section";
import { Accordion } from "@/components/primitives/Accordion";
import { Button } from "@/components/primitives/Button";
import { LineIcon } from "@/components/icons/LineIcon";
import type { SectionHeader as HeaderData, FaqItem } from "@/lib/types";

export function Faq({header,faqs}:{header:HeaderData;faqs:FaqItem[]}){
  return <Section id="faq" ground="quiet" ruleTop innerClassName="!py-24 max-[767px]:!py-16">
    <div className="grid grid-cols-[.85fr_1.15fr] items-start gap-20 max-[980px]:grid-cols-1 max-[980px]:gap-12">
      <header className="sticky top-[calc(var(--header-h)+24px)] flex flex-col gap-4 max-[980px]:static"><span className="eyebrow">{header.eyebrow}</span><h2 className="m-0 font-display text-[clamp(28px,3vw,40px)] font-medium leading-[1.14]">Questions, <em className="gradient-text">answered.</em></h2><p className="m-0 text-[15.5px] leading-relaxed text-slate">{header.lead}</p><Button href="/#contact" size="sm" className="mt-2 self-start">Still have questions? Contact us <LineIcon name="arrow-right" size={15}/></Button></header>
      <Accordion items={faqs.map(f=>({question:f.question,answer:f.answer}))} className="border-t border-rule"/>
    </div>
  </Section>;
}
