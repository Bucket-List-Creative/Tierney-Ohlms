import type { Metadata } from "next";
import Link from "next/link";
import { getHomeData } from "@/lib/data";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/primitives/Button";
import { MediaFrame } from "@/components/primitives/MediaFrame";
import { AnimatedStats } from "@/components/sections/AnimatedStats";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Reveal } from "@/components/primitives/Reveal";
import { LineIcon } from "@/components/icons/LineIcon";
import { IconTile } from "@/components/primitives/IconTile";
import { cn } from "@/lib/cn";
import servicesPhoto from "@/assets/services-hero.jpg";
import type { Service } from "@/lib/types";

export const metadata: Metadata = {
  title: "Outsourced Accounting Services",
  description:
    "From cleanup to controller oversight: bookkeeping, monthly close, CPA-prepared financials, tax, payroll, and automation. One flat monthly fee.",
};

export default async function ServicesPage() {
  const { services, stats, site } = await getHomeData();

  return (
    <>
      {/* Hero */}
      <section className="aura-hero overflow-hidden border-b border-rule">
        <div className="container-x pb-14 pt-16 max-[980px]:pb-12 max-[980px]:pt-12">
          <div className="grid grid-cols-[1.05fr_minmax(0,0.95fr)] items-center gap-14 max-[980px]:grid-cols-1 max-[980px]:gap-10">
            <div className="flex min-w-0 flex-col items-start gap-6">
              <nav className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slate">
                <Link href="/" className="hover:text-ink">
                  Home
                </Link>
                <span aria-hidden>/</span>
                <span className="text-ink">Services</span>
              </nav>
              <span className="eyebrow">Services</span>
              <h1 className="m-0 max-w-[17ch] font-display text-[52px] leading-[1.08] max-[1100px]:text-[44px] max-[767px]:text-[34px]">
                Everything an accounting department does, under one roof.
              </h1>
              <p className="m-0 max-w-[56ch] text-lead text-slate">
                Everything an owner-operated business needs, under one roof, on a modern
                stack, for one flat monthly fee. Start wherever you are, and grow into the rest.
              </p>
              <div className="mt-1 flex flex-wrap gap-3.5">
                <Button href="/#contact" variant="primary">
                  Get Started
                </Button>
                <Button href={site.phoneHref} variant="secondary">
                  Call {site.phone}
                </Button>
              </div>
            </div>

            <div className="min-w-0">
              <MediaFrame
                fallback={servicesPhoto}
                alt="Modern accounting office"
                priority
                sizes="(max-width: 980px) 100vw, 46vw"
                className="h-[420px] w-full max-[980px]:h-[300px] max-[520px]:h-[230px]"
              />
            </div>
          </div>

          <div className="mt-12 border-t border-rule pt-9 max-[980px]:mt-9 max-[980px]:pt-7">
            <AnimatedStats stats={stats} />
          </div>
        </div>
      </section>

      {/* Service ladder */}
      <Section ground="white">
        <div className="mb-12 flex max-w-[640px] flex-col gap-4">
          <span className="eyebrow">The service ladder</span>
          <h2 className="m-0 font-display text-h2 max-[767px]:text-[30px]">
            Cleanup to controller.
          </h2>
          <p className="m-0 text-[17px] leading-relaxed text-slate">
            The order below reflects how businesses grow with us. Start where you are today,
            and add the next rung when you&rsquo;re ready.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {services.map((service, i) => (
            <Reveal key={service._id} delay={0}>
              <ServiceBlock service={service} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBanner
        eyebrow="Let's talk"
        banner={{
          heading: "Not sure where to start?",
          lead: "Tell us where your books are today and we'll map out the right rung, plus everything above it. No pressure, no obligation.",
          cta: { label: "Get Started Today", href: "/#contact", variant: "inverse" },
        }}
        secondaryCta={{ label: `Call ${site.phone}`, href: site.phoneHref }}
        notes={[
          "One flat monthly fee",
          "No long-term contract",
          "A reply within one business day",
        ]}
      />
    </>
  );
}

function ServiceBlock({ service, index }: { service: Service; index: number }) {
  const top = service.topTier;
  return (
    <article
      className={cn(
        "grid grid-cols-[.85fr_1.4fr] gap-10 rounded-card border p-9 transition-all duration-[250ms] ease-out max-[820px]:grid-cols-1 max-[820px]:gap-6 max-[767px]:p-7",
        top
          ? "surface-dark border-transparent text-white shadow-[var(--shadow-gold)]"
          : "border-rule bg-white hover:-translate-y-[2px] hover:border-gold hover:shadow-[var(--shadow-gold)]",
      )}
    >
      {/* Left */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          {top ? (
            <span className="flex h-[52px] w-[52px] items-center justify-center rounded-btn border border-dark-border bg-white/5 text-gold">
              <LineIcon name={service.icon} size={24} />
            </span>
          ) : (
            <IconTile icon={service.icon} tile={52} size={24} />
          )}
          {top ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-gold">
              <LineIcon name="star" size={12} />
              Most popular
            </span>
          ) : (
            <span className="font-mono text-[13px] font-medium tracking-[0.1em] text-brass">
              {String(index).padStart(2, "0")}
            </span>
          )}
        </div>
        <h3
          className={cn(
            "m-0 font-display text-[24px] font-semibold max-[767px]:text-[22px]",
            top ? "text-white" : "text-ink",
          )}
        >
          {service.title}
        </h3>
        {service.tagline ? (
          <p
            className={cn(
              "m-0 font-display text-[19px] italic leading-snug",
              top ? "text-gold" : "text-brass",
            )}
          >
            {service.tagline}
          </p>
        ) : null}
      </div>

      {/* Right */}
      <div className="flex flex-col gap-4">
        {service.audience ? (
          <p
            className={cn(
              "m-0 text-[13px] font-semibold uppercase tracking-[0.12em]",
              top ? "text-dark-label" : "text-slate",
            )}
          >
            {service.audience}
          </p>
        ) : null}
        <p
          className={cn(
            "m-0 text-[15px] leading-relaxed",
            top ? "text-dark-body" : "text-slate",
          )}
        >
          {service.detail ?? service.description}
        </p>
        {service.youGet ? (
          <div
            className={cn(
              "mt-1 flex gap-3 rounded-input border-l-2 pl-4",
              top ? "border-gold" : "border-gold",
            )}
          >
            <span className="flex flex-col gap-1">
              <span
                className={cn(
                  "text-[11px] font-semibold uppercase tracking-[0.14em]",
                  top ? "text-gold" : "text-brass",
                )}
              >
                You get
              </span>
              <span
                className={cn(
                  "text-[15px] leading-relaxed",
                  top ? "text-white" : "text-ink",
                )}
              >
                {service.youGet}
              </span>
            </span>
          </div>
        ) : null}
        <Link
          href="/#contact"
          className={cn(
            "mt-1 inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors",
            top ? "text-gold hover:text-white" : "text-brass hover:text-ink",
          )}
        >
          Get started
          <LineIcon name="arrow-right" size={15} />
        </Link>
      </div>
    </article>
  );
}
