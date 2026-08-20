"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/primitives/Button";
import { LineIcon } from "@/components/icons/LineIcon";
import type { SectionHeader as HeaderData, Service } from "@/lib/types";

export function Services({ header, services }: { header: HeaderData; services: Service[] }) {
  const visible = services.slice(0, 6);
  const [active, setActive] = useState(0);
  const current = visible[active] ?? visible[0];
  return <section id="services" className="mesh-dark border-t border-white/10 text-white">
    <div className="container-x py-24 max-[767px]:py-16">
      <header className="mb-14 flex max-w-[600px] flex-col gap-4 max-[767px]:mb-10">
        <span className="eyebrow text-gold">{header.eyebrow}</span>
        <h2 className="m-0 font-display text-[clamp(28px,3vw,40px)] font-medium leading-[1.14]">Everything, under <em className="gradient-text-dark">one roof.</em></h2>
        <p className="m-0 text-[15.5px] leading-relaxed text-dark-body">{header.lead}</p>
      </header>
      <div className="grid grid-cols-[1.05fr_.95fr] items-start gap-16 max-[980px]:grid-cols-1">
        <div>
          {visible.map((service,i) => <Link key={service._id} href={`/services/${service.slug}`} onMouseEnter={()=>setActive(i)} onFocus={()=>setActive(i)} className={`group grid grid-cols-[44px_1fr_28px] items-center gap-4 border-t border-white/12 px-2 py-5 text-white transition-all duration-300 hover:pl-3 ${active===i?"pl-3":""}`}>
            <span className={`font-mono text-[12px] ${active===i?"text-gold":"text-dark-label"}`}>{String(i+1).padStart(2,"0")}</span>
            <span className={`font-display text-[clamp(18px,1.7vw,23px)] transition-colors ${active===i?"text-white":"text-white/55"}`}>{service.title}</span>
            <LineIcon name="arrow-right" size={18} className={`text-gold transition-all ${active===i?"translate-x-0 opacity-100":"-translate-x-2 opacity-0"}`}/>
            <span className="col-span-3 hidden text-[14px] leading-relaxed text-dark-body max-[980px]:block">{service.description}</span>
          </Link>)}
        </div>
        {current && <aside className="sticky top-[calc(var(--header-h)+24px)] flex min-h-[320px] flex-col gap-[18px] rounded-panel border border-white/14 bg-white/[.04] p-8 max-[980px]:hidden">
          <span className="font-mono text-[11px] uppercase tracking-[.14em] text-gold">Service {String(active+1).padStart(2,"0")} / {String(visible.length).padStart(2,"0")}</span>
          <h3 className="m-0 font-display text-[clamp(24px,2.1vw,31px)] font-medium">{current.title}</h3>
          <p className="m-0 text-[15px] leading-relaxed text-dark-body">{current.description}</p>
          <Button href={`/services/${current.slug}`} variant="inverse" className="mt-auto self-start">Explore service <LineIcon name="arrow-right" size={16}/></Button>
        </aside>}
      </div>
    </div>
  </section>;
}
