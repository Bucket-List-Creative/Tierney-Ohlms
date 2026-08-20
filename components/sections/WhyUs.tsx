import { Button } from "@/components/primitives/Button";
import { IconTile } from "@/components/primitives/IconTile";
import { LineIcon } from "@/components/icons/LineIcon";
import type { SectionHeader as HeaderData, Feature } from "@/lib/types";

export function WhyUs({ header, features }: { header: HeaderData; features: Feature[] }) {
  return <section id="why" className="mesh-bone border-t border-rule">
    <div className="container-x py-24 max-[767px]:py-16">
      <header className="mb-12 flex max-w-[600px] flex-col gap-4">
        <span className="eyebrow">{header.eyebrow}</span>
        <h2 className="m-0 font-display text-[clamp(28px,3vw,40px)] font-medium leading-[1.14]">The difference expert <em className="gradient-text">support</em> makes.</h2>
        <p className="m-0 text-[15.5px] leading-relaxed text-slate">{header.lead}</p>
      </header>
      <div className="grid grid-cols-3 gap-5 max-[980px]:grid-cols-1">
        <article className="grid grid-cols-[auto_1fr] items-center gap-7 rounded-panel border border-rule bg-white p-8 transition hover:border-gold hover:shadow-[var(--shadow-hover)] min-[981px]:col-span-2 max-[560px]:grid-cols-1">
          <div><strong className="gradient-text font-display text-[clamp(54px,5vw,76px)] font-medium leading-none">60<span className="text-[.5em]">%</span></strong><span className="mt-2 block font-mono text-[10px] uppercase tracking-[.14em] text-dark-label">Typical savings</span></div>
          <div><h3 className="m-0 font-display text-[24px] font-semibold">Cost-Effective</h3><p className="mb-0 text-[15px] leading-relaxed text-slate">Save up to 60% compared to hiring full-time accounting staff while getting expert-level service.</p></div>
        </article>
        {features.slice(0,4).map(feature => <article key={feature._id} className="flex flex-col gap-3.5 rounded-panel border border-rule bg-white p-6 transition duration-300 hover:-translate-y-[3px] hover:shadow-[var(--shadow-hover)]"><IconTile icon={feature.icon} tile={44} size={19}/><h3 className="m-0 font-display text-[18px] font-semibold">{feature.title}</h3><p className="m-0 text-[14px] leading-relaxed text-slate">{feature.description}</p></article>)}
        <article className="mesh-dark grid items-center gap-10 rounded-panel p-9 text-white min-[981px]:col-span-3 min-[981px]:grid-cols-[1fr_auto] max-[560px]:p-7">
          <div><span className="font-mono text-[11px] uppercase tracking-[.14em] text-gold">Peace of mind</span><p className="mb-0 mt-3 max-w-[42ch] font-display text-[clamp(21px,2.1vw,28px)] italic leading-snug">Rest easy knowing your finances are in expert hands, allowing you to focus on your core business.</p></div>
          <Button href="/#contact" variant="inverse">Talk to our team <LineIcon name="arrow-right" size={16}/></Button>
        </article>
      </div>
    </div>
  </section>;
}
