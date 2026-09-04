"use client";

import { useEffect, useRef } from "react";
import type { SectionHeader as HeaderData, ProcessStep } from "@/lib/types";
import { EmphasisText } from "@/components/primitives/EmphasisText";

export function Process({ header, steps }: { header: HeaderData; steps: ProcessStep[] }) {
  const runway=useRef<HTMLElement>(null), track=useRef<HTMLDivElement>(null), progress=useRef<HTMLSpanElement>(null);
  useEffect(()=>{const section=runway.current,row=track.current,bar=progress.current;if(!section||!row)return;let raf=0;const ease=(t:number)=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;const apply=()=>{raf=0;const r=section.getBoundingClientRect(),raw=Math.min(1,Math.max(0,-r.top/(r.height-window.innerHeight))),p=raw<.08?0:raw>.92?1:ease((raw-.08)/.84),max=Math.max(0,row.scrollWidth-window.innerWidth);row.style.transform=`translate3d(${-p*max}px,0,0)`;if(bar)bar.style.width=`${p*100}%`};const queue=()=>{if(!raf)raf=requestAnimationFrame(apply)};window.addEventListener("scroll",queue,{passive:true});window.addEventListener("resize",queue,{passive:true});apply();return()=>{cancelAnimationFrame(raf);window.removeEventListener("scroll",queue);window.removeEventListener("resize",queue)}},[]);
  return <section ref={runway} id="process" className="relative h-[340vh] border-t border-rule bg-white">
    <div className="sticky top-[var(--header-h)] flex h-[calc(100svh-var(--header-h))] flex-col justify-center overflow-hidden py-8">
      <header className="container-x mb-9 flex w-full flex-col items-start gap-3 text-left"><span className="eyebrow">{header.eyebrow}</span><h2 className="m-0 font-display text-[clamp(28px,3vw,40px)] font-medium leading-[1.14]"><EmphasisText text={header.heading} emphasis={header.emphasis} /></h2><p className="m-0 max-w-[600px] text-[15.5px] leading-relaxed text-slate">{header.lead}</p></header>
      <div ref={track} className="flex w-max gap-7 pl-[max(32px,calc((100vw-1240px)/2+32px))] pr-16 will-change-transform">
        {steps.slice(0,4).map((step,i)=><article key={step._id} className={`flex w-[min(420px,72vw)] shrink-0 flex-col rounded-panel border p-8 ${i===3?"mesh-dark border-black text-white":"border-rule bg-white"}`}><span className={`font-display text-[52px] leading-none ${i===3?"gradient-text-dark":"gradient-text"}`}>{step.index}</span><h3 className="mb-2 mt-5 font-display text-[24px] font-semibold">{step.title}</h3><p className={`m-0 text-[14.5px] leading-relaxed ${i===3?"text-dark-body":"text-slate"}`}>{step.description}</p><span className="mt-auto pt-8"><i className="block h-px w-11 bg-gold"/></span></article>)}
      </div>
      <div className="relative mx-auto mt-8 h-px w-[280px] bg-rule"><span ref={progress} className="absolute inset-y-0 left-0 bg-gradient-to-r from-brass to-gold"/></div>
    </div>
  </section>;
}
