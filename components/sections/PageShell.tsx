import Link from "next/link";
import type { ReactNode } from "react";
import { Section, Orb } from "@/components/layout/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { Button } from "@/components/primitives/Button";
import { LineIcon } from "@/components/icons/LineIcon";
import { EmphasisText } from "@/components/primitives/EmphasisText";

/**
 * Opening block for the standalone pages behind the nav links.
 *
 * These pages carry the same CMS section header the homepage does, but as the
 * page's <h1> rather than a section <h2> — which is why the section itself is
 * rendered with `hideHeader`. One heading per page, and it is the right one.
 */
export function PageIntro({
  crumb,
  eyebrow,
  heading,
  emphasis,
  lead,
}: {
  crumb: string;
  eyebrow?: string;
  heading: string;
  emphasis?: string;
  lead?: string;
}) {
  return (
    <Section
      ground="white"
      className="!pb-0"
      innerClassName="!pb-0"
      atmosphere={
        <Orb
          tone="gold"
          drift="a"
          className="right-[-12%] top-[-22%] h-[600px] w-[600px] opacity-45"
        />
      }
    >
      <Reveal duration={800} className="flex max-w-[760px] flex-col gap-5">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 font-mono text-[10px] max-[1199px]:text-[12px] uppercase tracking-[.14em] text-dark-label"
        >
          <Link
            href="/"
            className="link-line inline-flex min-h-11 items-center transition-colors hover:text-ink"
          >
            Home
          </Link>
          <span aria-hidden>/</span>
          <span className="text-ink">{crumb}</span>
        </nav>
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1 className="m-0 font-display text-[clamp(32px,4.6vw,54px)] font-medium leading-[1.1]">
          <EmphasisText text={heading} emphasis={emphasis} />
        </h1>
        {lead ? (
          <p className="m-0 max-w-[62ch] text-lead leading-relaxed text-slate">{lead}</p>
        ) : null}
      </Reveal>
    </Section>
  );
}

/** Closing call to action. Each page points somewhere specific. */
export function PageCta({
  heading,
  lead,
  primary,
  secondary,
}: {
  heading: string;
  lead?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string; icon?: ReactNode };
}) {
  return (
    <Section
      ground="dark"
      ruleTop
      atmosphere={
        <Orb
          tone="gold"
          drift="b"
          className="left-[8%] top-[-20%] h-[560px] w-[560px] opacity-60"
        />
      }
    >
      <Reveal duration={800} className="flex flex-col items-center gap-6 text-center">
        <h2 className="m-0 max-w-[22ch] font-display text-[clamp(26px,3vw,38px)] font-medium leading-[1.14] text-white">
          {heading}
        </h2>
        {lead ? (
          <p className="m-0 max-w-[54ch] text-[15.5px] leading-relaxed text-dark-body">{lead}</p>
        ) : null}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href={primary.href} variant="inverse">
            {primary.label} <LineIcon name="arrow-right" size={16} />
          </Button>
          {secondary ? (
            <Button href={secondary.href} variant="inverse-outline">
              {secondary.icon}
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
