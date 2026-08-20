"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { HomePage } from "@/lib/types";
import styles from "./HeroScenes.module.css";

type HeroData = HomePage["hero"];
type Vars = CSSProperties & { "--delay"?: string };

export function Hero({ hero }: { hero: HeroData }) {
  const runwayRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scenesRef = useRef<(HTMLDivElement | null)[]>([]);
  const a = hero.artifacts!;
  const strategy = hero.strategyScene!;

  useEffect(() => {
    const runway = runwayRef.current;
    const track = trackRef.current;
    if (!runway || !track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let active = 0;
    const ease = (t: number) => t < 0.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2;
    const apply = () => {
      raf = 0;
      const rect = runway.getBoundingClientRect();
      const visibleHeight = runway.querySelector<HTMLElement>(`.${styles.viewport}`)?.offsetHeight ?? window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / (rect.height-visibleHeight)));
      const slide = progress < .3 ? 0 : progress > .7 ? 1 : ease((progress-.3)/.4);
      track.style.transform = `translate3d(${-slide*100}vw,0,0)`;
      const next = slide > .5 ? 1 : 0;
      if (next !== active) {
        active = next;
        if (!reduce) scenesRef.current.forEach((scene,i) => scene?.classList.toggle(styles.active,i===active));
      }
    };
    const queue = () => { if (!raf) raf=requestAnimationFrame(apply); };
    if (reduce) scenesRef.current.forEach(scene => scene?.classList.add(styles.active));
    else requestAnimationFrame(() => requestAnimationFrame(() => scenesRef.current[0]?.classList.add(styles.active)));
    window.addEventListener("scroll",queue,{passive:true});
    window.addEventListener("resize",queue,{passive:true});
    apply();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll",queue); window.removeEventListener("resize",queue); };
  },[]);

  return <section ref={runwayRef} id="top" aria-label="Intro" className={styles.runway}>
    <div
      className={styles.viewport}
      style={{
        top: "var(--header-h)",
        width: "100%",
        height: "calc(100svh - var(--header-h))",
      }}
    >
      <div ref={trackRef} className={styles.track}>
        <Scene setRef={node => { scenesRef.current[0]=node; }}>
          <Card className={`${styles.ledger} ${styles.edge}`} delay=".15s"><Head left={a.monthlyCloseLabel} right={a.monthlyClosePeriod}/><Rows rows={[["Revenue",a.revenue],["Expenses",a.expenses],["Net",a.net]]}/><small className={styles.checked}><b>✓</b> Reconciled</small></Card>
          <Card className={`${styles.folder} ${styles.edge}`} delay=".3s"><Mono>Ledger</Mono><strong>{a.closeSummary}</strong><Progress value="86%"/><Mono>{a.automation}</Mono></Card>
          <Card className={`${styles.note} ${styles.edge}`} delay=".45s"><i>{a.note}</i></Card>
          <Card className={styles.chart} delay=".55s"><Head left="Cash flow" right={a.cashFlowChange}/><div className={styles.bars}>{[34,48,42,62,74,100].map((h,i)=><i key={h} style={{height:`${h}%`}} className={i>3?styles.darkBar:""}/>)}</div><div className={styles.months}>{["Oct","Nov","Dec","Jan","Feb","Mar"].map(x=><span key={x}>{x}</span>)}</div></Card>
          <Card className={styles.invoice} delay=".65s"><div className={styles.head}><Mono>{a.invoiceNumber}</Mono><span className={styles.paid}>Paid</span></div><Money value={a.invoiceAmount}/><div className={styles.segment}><i/><i/><i/></div></Card>
          <Copy eyebrow={hero.eyebrow} heading={hero.heading.replace(/\.$/,"")} emphasis="&" lead={hero.lead} level="h1"/>
        </Scene>
        <Scene setRef={node => { scenesRef.current[1]=node; }}>
          <Card className={`${styles.filings} ${styles.edge}`} delay=".15s"><Mono>Filings</Mono><strong>{a.filingTitle}</strong><span>◷ {a.filingDue}</span><Progress value="72%"/><Mono>{a.filingProgress}</Mono></Card>
          <Card className={`${styles.reminder} ${styles.edge}`} delay=".3s"><div className={styles.reminderTop}><span className={styles.iconTile}>□</span><div><strong>{a.reviewTitle}</strong><small>{a.reviewSubtitle}</small></div></div><Head left={a.reviewTime} right="45 min"/></Card>
          <Card className={`${styles.seal} ${styles.hideMedium}`} delay=".45s"><b>&amp;</b></Card>
          <Card className={styles.savings} delay=".55s"><Mono>Tax savings found</Mono><Money value={a.taxSavings}/><small>⌃ &nbsp; vs. prior-year filing</small></Card>
          <Card className={styles.deadlines} delay=".65s"><Mono>Deadlines</Mono><Rows rows={[["1099s filed","Done"],["Q1 estimates","Apr 15"],["Extension review","May 01"]]}/></Card>
          <Copy eyebrow={strategy.eyebrow} heading={strategy.heading} emphasis={strategy.emphasis} lead={strategy.lead} level="h2"/>
        </Scene>
      </div>
      <div className={styles.fade} aria-hidden/>
    </div>
  </section>;
}

function Scene({children,setRef}:{children:ReactNode;setRef:(node:HTMLDivElement|null)=>void}){return <div ref={setRef} className={styles.scene}>{children}</div>}
function Card({children,className,delay}:{children:ReactNode;className:string;delay:string}){return <div aria-hidden className={`${styles.card} ${className}`} style={{"--delay":delay} as Vars}>{children}</div>}
function Mono({children}:{children:ReactNode}){return <span className={styles.mono}>{children}</span>}
function Head({left,right}:{left:string;right:string}){return <div className={styles.head}><Mono>{left}</Mono><strong className={styles.gradient}>{right}</strong></div>}
function Progress({value}:{value:string}){return <div className={styles.progress}><i style={{width:value}}/></div>}
function Rows({rows}:{rows:string[][]}){return <div className={styles.rows}>{rows.map(([left,right])=><div key={left}><span>{left}</span><span className={left==="Net"||right==="Done"?styles.brass:styles.mono}>{right}</span></div>)}</div>}
function Money({value}:{value:string}){const [whole,cents]=value.split(".");return <span className={styles.money}><sup>$</sup><span className={styles.gradient}>{whole}</span>{cents&&<small>.{cents}</small>}</span>}
function Copy({eyebrow,heading,emphasis,lead,level}:{eyebrow:string;heading:string;emphasis?:string;lead:string;level:"h1"|"h2"}){const Heading=level;const parts=emphasis?heading.split(emphasis):[heading];return <div className={styles.copy}><div className={styles.eyebrow} style={{"--delay":".1s"} as Vars}>{eyebrow}</div><Heading style={{"--delay":".22s"} as Vars}>{parts[0]}{parts.length>1&&<><em>{emphasis}</em>{parts.slice(1).join(emphasis)}</>}</Heading><p style={{"--delay":".34s"} as Vars}>{lead}</p></div>}
