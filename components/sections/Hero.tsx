"use client";

import {
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import type { HomePage } from "@/lib/types";
import styles from "./hero/HeroWorkspace.module.css";
import { useWorkspaceCamera } from "./hero/useWorkspaceCamera";
import {
  Bars,
  Doc,
  Foreground,
  Head,
  Money,
  Mono,
  Progress,
  Reconciled,
  Rows,
  Tally,
  type Place,
} from "./hero/parts";

type HeroData = HomePage["hero"];
type Vars = CSSProperties & { "--delay"?: string };

/* ==========================================================================
   Placement — the workspace, laid out.

   Coordinates are the *ordered* resting position. `ox/oy` and `tz` are how
   far off that grid each document starts; the camera's `--scatter` channel
   multiplies them, so scrolling resolves a scattered desk into an aligned
   one. That is the chaos-to-clarity metaphor, expressed as one variable.
   ========================================================================== */

const CHAPTER_ONE: Record<string, Place> = {
  ledger: {
    x: "12%", y: "20%", w: 250, z: -180, o: 0.94,
    ox: -26, oy: 34, tx: 4, ty: 8, tz: -6,
    dx: -190, dy: -130, dz: 280, delay: 150, sheen: -12,
    xs: "6%", ys: "9%", ws: 152,
  },
  books: {
    x: "88%", y: "18%", w: 240, z: -90,
    ox: 30, oy: -18, ty: -9, tz: 5,
    dx: 200, dy: -145, dz: 300, delay: 300, sheen: 8,
    xs: "97%", ys: "13%", ws: 150,
  },
  note: {
    x: "31%", y: "16%", w: 174, z: 30,
    ox: -18, oy: -26, tz: -9,
    dx: -180, dy: -150, dz: 400, delay: 450,
  },
  cashflow: {
    x: "14%", y: "80%", w: 258, z: -250, o: 0.9,
    ox: 22, oy: 26, ty: 6, tz: 4,
    dx: -180, dy: 160, dz: 250, delay: 550, sheen: 14,
    xs: "19%", ys: "93%", ws: 158,
  },
  invoice: {
    x: "87%", y: "78%", w: 246, z: 50,
    ox: -24, oy: 20, ty: -7, tz: -5,
    dx: 215, dy: 140, dz: 330, delay: 650, sheen: -6,
  },
};

const CHAPTER_TWO: Record<string, Place> = {
  filings: {
    x: "12.5%", y: "20%", w: 244, z: -170, o: 0.94,
    ox: 18, oy: -22, ty: 7, tz: -4,
    dx: -185, dy: -120, dz: 270, delay: 150, sheen: -10,
    xs: "6%", ys: "9%", ws: 152,
  },
  review: {
    x: "87.5%", y: "22%", w: 238, z: -70,
    ox: -20, oy: 24, ty: -6, tz: 5,
    dx: 195, dy: -130, dz: 290, delay: 300, sheen: 10,
    xs: "97%", ys: "13%", ws: 150,
  },
  seal: {
    x: "77%", y: "10%", w: 84, z: 70,
    ox: 14, oy: 18, tz: -3,
    dx: 150, dy: -90, dz: 340, delay: 450,
  },
  savings: {
    x: "13.5%", y: "79%", w: 258, z: -230, o: 0.92,
    ox: -16, oy: 20, ty: 6, tz: -3,
    dx: -175, dy: 155, dz: 250, delay: 550, sheen: 12,
    xs: "19%", ys: "93%", ws: 158,
  },
  deadlines: {
    x: "87%", y: "77%", w: 248, z: -30,
    ox: 22, oy: -18, ty: -7, tz: 4,
    dx: 205, dy: 135, dz: 310, delay: 650, sheen: -4,
  },
};

/**
 * Layer 1 — paper close enough to the lens to be cropped by the frame.
 * Each one lives in a gutter the floating documents leave empty, so near
 * paper crops the frame rather than burying a card behind it.
 *
 * Positive z pushes these *outward* as well as making them larger:
 * perspective multiplies an element's whole offset from `perspective-origin`
 * by P/(P-z), which is ~1.2 here. Author them nearer the centre than where
 * they should land, or they sail off the edge entirely.
 */
const FOREGROUND: Record<string, Place> = {
  sheet: { x: "5%", y: "50%", w: 300, h: 340, z: 200, tz: 7, o: 0.97 },
  receipt: { x: "90%", y: "52%", w: 170, z: 240, tz: -6, o: 0.95 },
  clip: { x: "22%", y: "93%", w: 76, z: 170, tz: 196, o: 0.85 },
};

/** Faint spreadsheet blocks on the back plane. */
const CELLS = [
  { x: "16%", y: "22%", w: "184px", h: "104px" },
  { x: "68%", y: "16%", w: "150px", h: "88px" },
  { x: "26%", y: "70%", w: "212px", h: "76px" },
  { x: "74%", y: "74%", w: "168px", h: "96px" },
];

/** Almost-invisible financial notation — atmosphere, not information. */
const ANNOTATIONS = [
  { x: "13%", y: "36%", t: "GL 4010 · 248,900" },
  { x: "70%", y: "30%", t: "AP AGING 0–30" },
  { x: "22%", y: "58%", t: "Q1 · RECONCILED" },
  { x: "63%", y: "62%", t: "TB DR = CR" },
  { x: "42%", y: "84%", t: "FY CLOSE 03/31" },
  { x: "80%", y: "48%", t: "REV REC 606" },
];

/**
 * The hero: the accounting workspace as the interface.
 *
 * Two chapters of documents float at their own depths inside one perspective
 * viewport, with the message on a plane of its own. Scrolling flies the
 * camera through chapter one — papers sweeping past, the desk tidying itself
 * — and lifts chapter two out of deep space already organised, before the
 * workspace darkens into the Services section below.
 *
 * All motion is CSS: `useWorkspaceCamera` publishes a handful of custom
 * properties and every transform here is a `calc()` off them. See
 * HeroWorkspace.module.css for the channel list.
 */
export function Hero({ hero }: { hero: HeroData }) {
  const runwayRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const panelA = useRef<HTMLDivElement>(null);
  const panelB = useRef<HTMLDivElement>(null);
  // Once a chapter is reached its micro-interactions arm and stay armed:
  // they are meant to be discovered once, not replayed on every pass.
  const [live, setLive] = useState<[boolean, boolean]>([false, false]);

  const onChapter = useCallback((index: 0 | 1) => {
    setLive((prev) => (prev[index] ? prev : index === 0 ? [true, prev[1]] : [prev[0], true]));
  }, []);

  useWorkspaceCamera({ runwayRef, viewportRef, panelRefs: [panelA, panelB], onChapter });

  const a = hero.artifacts!;
  const strategy = hero.strategyScene!;

  return (
    <section ref={runwayRef} id="top" aria-label="Intro" className={styles.runway}>
      {/* Without JS the entrance never runs and neither chapter is placed, so
          settle the paper and show chapter one only. */}
      <noscript>
        <style>{`.${styles.paper},.${styles.copy}>*{opacity:1!important;transform:none!important}.${styles.panelB},.${styles.foreground},.${styles.cue}{display:none}`}</style>
      </noscript>

      <div ref={viewportRef} className={styles.viewport}>
        {/* ---- Layer 4: the desk ------------------------------------ */}
        <div aria-hidden className={styles.ground}>
          <div className={styles.groundRules} />
          <div className={styles.groundDots} />
          <div className={styles.groundCells}>
            {CELLS.map((c, i) => (
              <i key={i} style={{ "--x": c.x, "--y": c.y, "--w": c.w, "--h": c.h } as CSSProperties} />
            ))}
          </div>
          {ANNOTATIONS.map((n) => (
            <span key={n.t} className={styles.tick} style={{ "--x": n.x, "--y": n.y } as CSSProperties}>
              {n.t}
            </span>
          ))}
        </div>

        {/* ---- Chapter one: the close ------------------------------- */}
        <Panel
          setRef={panelA}
          live={live[0]}
          copy={
            <Copy
              level="h1"
              eyebrow={hero.eyebrow}
              heading={hero.heading.replace(/\.$/, "")}
              emphasis="&"
              lead={hero.lead}
            />
          }
        >
          <Doc place={CHAPTER_ONE.ledger}>
            <Head left={a.monthlyCloseLabel} right={a.monthlyClosePeriod} />
            <Rows
              rows={[
                ["Revenue", <Tally key="r" value={a.revenue} live={live[0]} delay={620} />],
                ["Expenses", <Tally key="e" value={a.expenses} live={live[0]} delay={700} />],
                ["Net", <Tally key="n" value={a.net} live={live[0]} delay={780} />],
              ]}
            />
            <Reconciled label="Reconciled" />
          </Doc>

          <Doc place={CHAPTER_ONE.books}>
            <Mono>Ledger</Mono>
            <strong>{a.closeSummary}</strong>
            <Progress value="86%" />
            <Mono>{a.automation}</Mono>
          </Doc>

          <Doc place={CHAPTER_ONE.note} className={styles.hideMd} paper={styles.note}>
            <span aria-hidden className={styles.pin} />
            <div className={styles.noteSway}>
              <i>{a.note}</i>
            </div>
          </Doc>

          <Doc place={CHAPTER_ONE.cashflow}>
            <Head
              left="Cash flow"
              right={<Tally value={a.cashFlowChange} live={live[0]} delay={700} />}
            />
            <Bars heights={[34, 48, 42, 62, 74, 100]} />
            <div className={styles.months}>
              {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </Doc>

          <Doc place={CHAPTER_ONE.invoice} className={styles.hideSm}>
            <div className={styles.head}>
              <Mono>{a.invoiceNumber}</Mono>
              <span className={styles.paid}>Paid</span>
            </div>
            <Money value={a.invoiceAmount} live={live[0]} />
            <div className={styles.segment}>
              <i />
              <i />
              <i />
            </div>
          </Doc>

        </Panel>

        {/* ---- Chapter two: tax & strategy, arriving in order -------- */}
        <Panel
          setRef={panelB}
          live={live[1]}
          className={styles.panelB}
          copy={
            <Copy
              level="h2"
              eyebrow={strategy.eyebrow}
              heading={strategy.heading}
              emphasis={strategy.emphasis}
              lead={strategy.lead}
            />
          }
        >
          <Doc place={CHAPTER_TWO.filings}>
            <Mono>Filings</Mono>
            <strong>{a.filingTitle}</strong>
            <span className={styles.mono}>{a.filingDue}</span>
            <Progress value="72%" />
            <Mono>{a.filingProgress}</Mono>
          </Doc>

          <Doc place={CHAPTER_TWO.review}>
            <div className={styles.reminderTop}>
              <span className={styles.iconTile}>□</span>
              <div>
                <strong>{a.reviewTitle}</strong>
                <small>{a.reviewSubtitle}</small>
              </div>
            </div>
            <Head left={a.reviewTime} right="45 min" />
          </Doc>

          <Doc place={CHAPTER_TWO.seal} className={styles.hideMd} paper={styles.seal}>
            <b>&amp;</b>
          </Doc>

          <Doc place={CHAPTER_TWO.savings}>
            <Mono>Tax savings found</Mono>
            <Money value={a.taxSavings} live={live[1]} />
            <small className={styles.checked}>vs. prior-year filing</small>
          </Doc>

          <Doc place={CHAPTER_TWO.deadlines} className={styles.hideSm}>
            <Mono>Deadlines</Mono>
            <Rows
              rows={[
                ["1099s filed", "Done"],
                ["Q1 estimates", "Apr 15"],
                ["Extension review", "May 01"],
              ]}
            />
            <Progress value="66%" />
          </Doc>

        </Panel>

        {/* ---- Layer 1: paper at the lens --------------------------- */}
        <div aria-hidden className={styles.foreground}>
          <Foreground place={FOREGROUND.sheet} className={styles.fgSheet} />
          <Foreground place={FOREGROUND.receipt} className={styles.fgReceipt}>
            {Array.from({ length: 9 }, (_, i) => (
              <i key={i} />
            ))}
          </Foreground>
          <Foreground place={FOREGROUND.clip} className={styles.fgClip}>
            <svg viewBox="0 0 60 120" aria-hidden>
              <path d="M42 30v58a18 18 0 0 1-36 0V26a12 12 0 0 1 24 0v58a6 6 0 0 1-12 0V32" />
            </svg>
          </Foreground>
        </div>

        {/* ---- Handoff ---------------------------------------------- */}
        <div aria-hidden className={styles.fade} />
        <div aria-hidden className={styles.veil} />
        <div aria-hidden className={styles.cue}>
          <svg viewBox="0 0 24 24">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}

/**
 * One chapter of the workspace: a 3D world of documents, plus its message on
 * a separate flat plane so the world's rotation never touches the type.
 */
function Panel({
  setRef,
  live,
  className,
  copy,
  children,
}: {
  setRef: RefObject<HTMLDivElement | null>;
  live: boolean;
  className?: string;
  copy: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      ref={setRef}
      className={`${styles.panel} ${live ? styles.panelLive : ""} ${className ?? ""}`}
    >
      <div className={styles.world}>{children}</div>
      {copy}
    </div>
  );
}

/** Layer 3 — typography. Translates and scales a few percent, never rotates. */
function Copy({
  eyebrow,
  heading,
  emphasis,
  lead,
  level,
}: {
  eyebrow: string;
  heading: string;
  emphasis?: string;
  lead: string;
  level: "h1" | "h2";
}) {
  const Heading = level;
  const parts = emphasis ? heading.split(emphasis) : [heading];
  return (
    <div className={styles.copy}>
      <div className={styles.eyebrow} style={{ "--delay": "100ms" } as Vars}>
        {eyebrow}
      </div>
      <Heading style={{ "--delay": "220ms" } as Vars}>
        {parts[0]}
        {parts.length > 1 && (
          <>
            <em>{emphasis}</em>
            {parts.slice(1).join(emphasis)}
          </>
        )}
      </Heading>
      <p style={{ "--delay": "340ms" } as Vars}>{lead}</p>
    </div>
  );
}
