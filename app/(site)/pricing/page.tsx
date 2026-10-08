import type { Metadata } from "next";
import Link from "next/link";
import { getPricingPage, getHomeData } from "@/lib/data";
import { pageMetadata } from "@/lib/seo/metadata";
import { Section, Orb } from "@/components/layout/Section";
import { Reveal, Stagger } from "@/components/primitives/Reveal";
import { Button } from "@/components/primitives/Button";
import { LineIcon } from "@/components/icons/LineIcon";
import { EmphasisText } from "@/components/primitives/EmphasisText";
import { PricingTable } from "@/components/sections/PricingTable";

export async function generateMetadata(): Promise<Metadata> {
  const [pricing, { site }] = await Promise.all([getPricingPage(), getHomeData()]);
  return pageMetadata({
    path: "/pricing",
    seo: pricing.seo,
    fallbackTitle: "Pricing",
    fallbackImage: site.ogImage,
  });
}

/**
 * Pricing.
 *
 * Follows the section grammar the rest of the site uses — light aura hero,
 * white body, quiet ground, dark close — so the page reads as part of the
 * site rather than a bolted-on table.
 */
export default async function PricingPage() {
  const pricing = await getPricingPage();
  const { site } = await getHomeData();

  return (
    <>
      <Section
        ground="white"
        atmosphere={
          <Orb
            tone="gold"
            drift="a"
            className="right-[-12%] top-[-22%] h-[640px] w-[640px] opacity-45"
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
            <span className="text-ink">Pricing</span>
          </nav>
          <span className="eyebrow">{pricing.hero.eyebrow}</span>
          <h1 className="m-0 font-display text-[clamp(32px,4.6vw,54px)] font-medium leading-[1.1]">
            <EmphasisText text={pricing.hero.heading} emphasis={pricing.hero.emphasis} />
          </h1>
          {pricing.hero.lead ? (
            <p className="m-0 max-w-[62ch] text-lead leading-relaxed text-slate">
              {pricing.hero.lead}
            </p>
          ) : null}
        </Reveal>

        <Reveal delay={140} duration={800} className="mt-12">
          <PricingTable engagements={pricing.engagements} />
        </Reveal>

        <Reveal delay={220} duration={700}>
          <p className="mb-0 mt-6 max-w-[70ch] text-[13.5px] leading-relaxed text-dark-label">
            Figures are the monthly fee for ongoing work. Cleanup and catch-up are
            quoted separately, run once, and don&rsquo;t sit inside the monthly fee.
          </p>
        </Reveal>
      </Section>

      <Section ground="bone" ruleTop>
        <Reveal duration={800} className="flex max-w-[640px] flex-col gap-4">
          <h2 className="m-0 font-display text-[clamp(26px,3vw,38px)] font-medium leading-[1.14]">
            {pricing.scopesHeading}
          </h2>
          {pricing.scopesLead ? (
            <p className="m-0 text-[15.5px] leading-relaxed text-slate">{pricing.scopesLead}</p>
          ) : null}
        </Reveal>

        <Stagger
          step={90}
          start={120}
          className="mt-10 grid grid-cols-3 gap-5 max-[900px]:grid-cols-1"
        >
          {pricing.scopes.map((scope) => (
            <article
              key={scope.name}
              className="flex h-full flex-col gap-3 rounded-panel border border-rule bg-white p-7 transition duration-300 hover:border-gold hover:shadow-[var(--shadow-hover)]"
            >
              <h3 className="m-0 font-display text-[20px] font-semibold text-ink">{scope.name}</h3>
              <p className="m-0 text-[14.5px] leading-relaxed text-slate">{scope.summary}</p>
            </article>
          ))}
        </Stagger>
      </Section>

      <Section ground="quiet" ruleTop>
        <div className="grid grid-cols-[.85fr_1.15fr] items-start gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <Reveal duration={800} className="flex flex-col gap-4">
            <h2 className="m-0 font-display text-[clamp(26px,3vw,38px)] font-medium leading-[1.14]">
              {pricing.driversHeading}
            </h2>
            {pricing.driversLead ? (
              <p className="m-0 text-[15.5px] leading-relaxed text-slate">{pricing.driversLead}</p>
            ) : null}
          </Reveal>

          <ul className="m-0 flex list-none flex-col p-0">
            {pricing.drivers.map((driver, i) => (
              <Reveal key={driver.title} as="li" delay={80 + i * 70} duration={700}>
                <div className="grid grid-cols-[auto_1fr] gap-5 border-t border-rule py-6">
                  <span className="font-mono text-[12px] text-brass">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="m-0 font-display text-[17px] font-semibold text-ink">
                      {driver.title}
                    </h3>
                    <p className="m-0 text-[14.5px] leading-relaxed text-slate">
                      {driver.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

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
          <h2 className="m-0 max-w-[20ch] font-display text-[clamp(26px,3vw,38px)] font-medium leading-[1.14] text-white">
            Want the number for your business?
          </h2>
          <p className="m-0 max-w-[52ch] text-[15.5px] leading-relaxed text-dark-body">
            Tell us your revenue, how many entities you run, and what your team already
            covers. We&rsquo;ll come back with a real figure, not a range.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="/contact" variant="inverse">
              Get a quote <LineIcon name="arrow-right" size={16} />
            </Button>
            <Button href={site.phoneHref} variant="inverse-outline">
              <LineIcon name="phone" size={15} /> Call {site.phone}
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
