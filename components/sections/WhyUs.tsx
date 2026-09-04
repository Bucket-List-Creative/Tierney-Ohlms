import { Button } from "@/components/primitives/Button";
import { IconTile } from "@/components/primitives/IconTile";
import { LineIcon } from "@/components/icons/LineIcon";
import type { SectionHeader as HeaderData, Feature } from "@/lib/types";
import { EmphasisText } from "@/components/primitives/EmphasisText";

/**
 * The section has three slots — a wide stat card, a run of grid cards, and a
 * full-width dark banner — and they all come from the Features list in order:
 * first feature leads, last one closes, everything between fills the grid.
 * Adding or reordering a Feature in the Studio now changes the page.
 *
 * The 60% figure stays hardcoded: it isn't a Feature field, and the claim is
 * still awaiting substantiation from the client.
 */
export function WhyUs({ header, features }: { header: HeaderData; features: Feature[] }) {
  const [lead, ...rest] = features;
  const closing = rest.length ? rest[rest.length - 1] : undefined;
  const grid = rest.length ? rest.slice(0, -1) : [];

  return <section id="why" className="mesh-bone border-t border-rule">
    <div className="container-x py-24 max-[767px]:py-16">
      <header className="mb-12 flex max-w-[600px] flex-col gap-4">
        <span className="eyebrow">{header.eyebrow}</span>
        <h2 className="m-0 font-display text-[clamp(28px,3vw,40px)] font-medium leading-[1.14]"><EmphasisText text={header.heading} emphasis={header.emphasis} /></h2>
        <p className="m-0 text-[15.5px] leading-relaxed text-slate">{header.lead}</p>
      </header>
      <div className="grid grid-cols-3 gap-5 max-[980px]:grid-cols-1">
        {lead && <article className="grid grid-cols-[auto_1fr] items-center gap-7 rounded-panel border border-rule bg-white p-8 transition hover:border-gold hover:shadow-[var(--shadow-hover)] min-[981px]:col-span-2 max-[560px]:grid-cols-1">
          <div><strong className="gradient-text font-display text-[clamp(54px,5vw,76px)] font-medium leading-none">60<span className="text-[.5em]">%</span></strong><span className="mt-2 block font-mono text-[10px] uppercase tracking-[.14em] text-dark-label">Typical savings</span></div>
          <div><h3 className="m-0 font-display text-[24px] font-semibold">{lead.title}</h3><p className="mb-0 text-[15px] leading-relaxed text-slate">{lead.description}</p></div>
        </article>}
        {grid.map(feature => <article key={feature._id} className="flex flex-col gap-3.5 rounded-panel border border-rule bg-white p-6 transition duration-300 hover:-translate-y-[3px] hover:shadow-[var(--shadow-hover)]"><IconTile icon={feature.icon} tile={44} size={19}/><h3 className="m-0 font-display text-[18px] font-semibold">{feature.title}</h3><p className="m-0 text-[14px] leading-relaxed text-slate">{feature.description}</p></article>)}
        {closing && <article className="mesh-dark grid items-center gap-10 rounded-panel p-9 text-white min-[981px]:col-span-3 min-[981px]:grid-cols-[1fr_auto] max-[560px]:p-7">
          <div><span className="font-mono text-[11px] uppercase tracking-[.14em] text-gold">{closing.title}</span><p className="mb-0 mt-3 max-w-[42ch] font-display text-[clamp(21px,2.1vw,28px)] italic leading-snug">{closing.description}</p></div>
          <Button href="/#contact" variant="inverse">Talk to our team <LineIcon name="arrow-right" size={16}/></Button>
        </article>}
      </div>
    </div>
  </section>;
}
