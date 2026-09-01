import type { Metadata } from "next";
import Link from "next/link";
import { getHomeData } from "@/lib/data";
import { Section, Orb } from "@/components/layout/Section";
import { Button } from "@/components/primitives/Button";
import { MediaFrame } from "@/components/primitives/MediaFrame";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Reveal } from "@/components/primitives/Reveal";
import { TextReveal, FadeIn } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Parallax } from "@/components/motion/Parallax";
import { Spotlight } from "@/components/motion/Spotlight";
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
  const { services, site } = await getHomeData();

  return (
    <>
      {/* Hero */}
      <section className="atmos aura-hero">
        <Orb
          tone="gold"
          drift="a"
          className="-right-[12%] -top-[36%] h-[720px] w-[720px] opacity-90 max-[980px]:h-[420px] max-[980px]:w-[420px]"
        />
        <Orb
          tone="bone"
          drift="b"
          className="-bottom-[40%] -left-[14%] h-[620px] w-[620px] max-[980px]:hidden"
        />

        <div className="container-x relative z-[1] pb-16 pt-16 max-[980px]:pb-12 max-[980px]:pt-12">
          <div className="grid grid-cols-[1.05fr_minmax(0,0.95fr)] items-center gap-14 max-[980px]:grid-cols-1 max-[980px]:gap-10">
            <div className="flex min-w-0 flex-col items-start gap-6">
              <Reveal variant="left" duration={700}>
                <nav
                  aria-label="Breadcrumb"
                  className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slate"
                >
                  <Link href="/" className="link-line transition-colors hover:text-ink">
                    Home
                  </Link>
                  <span aria-hidden>/</span>
                  <span className="text-ink">Services</span>
                </nav>
              </Reveal>
              <Reveal variant="left" delay={80} duration={700}>
                <span className="eyebrow eyebrow-rule">Services</span>
              </Reveal>
              <TextReveal
                as="h1"
                text="Everything an accounting department does, under one roof."
                delay={120}
                step={50}
                className="m-0 max-w-[17ch] font-display text-hero text-ink"
              />
              <FadeIn delay={300} className="m-0 max-w-[56ch] text-lead text-slate">
                Everything an owner-operated business needs, under one roof, on a modern
                stack, for one flat monthly fee. Start wherever you are, and grow into the rest.
              </FadeIn>
              <Reveal delay={420} duration={700} className="mt-1">
                <div className="flex flex-wrap gap-3.5">
                  <Magnetic strength={0.24}>
                    <Button href="/#contact" variant="primary">
                      Get Started
                      <LineIcon
                        name="arrow-right"
                        size={17}
                        className="transition-transform duration-300 group-hover/btn:translate-x-1"
                      />
                    </Button>
                  </Magnetic>
                  <Button href={site.phoneHref} variant="secondary">
                    <LineIcon name="phone" size={16} />
                    Call {site.phone}
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="min-w-0">
              <Parallax strength={-40} minWidth={980}>
                <Reveal variant="mask" duration={1100} className="group relative">
                  <span
                    aria-hidden
                    className="absolute -bottom-6 -right-6 z-0 h-full w-full rounded-panel border border-gold/45 bg-goldwash max-[520px]:-bottom-3 max-[520px]:-right-3"
                  />
                  <div className="relative z-[1]">
                    <MediaFrame
                      fallback={servicesPhoto}
                      alt="Modern accounting office"
                      priority
                      zoom
                      overlay
                      sizes="(max-width: 980px) 100vw, 46vw"
                      className="h-[440px] w-full shadow-[var(--shadow-hover)] max-[980px]:h-[310px] max-[520px]:h-[240px]"
                    />
                  </div>
                </Reveal>
              </Parallax>
            </div>
          </div>
        </div>

        <div aria-hidden className="rule-fade absolute inset-x-0 bottom-0 z-[2]" />
      </section>

      {/* Service ladder */}
      <Section
        ground="quiet"
        atmosphere={
          <>
            <Orb
              tone="gold"
              drift="b"
              className="-left-[16%] top-[12%] h-[560px] w-[560px] opacity-60 max-[900px]:hidden"
            />
            <Orb
              tone="ink"
              className="-right-[12%] bottom-[8%] h-[460px] w-[460px] max-[900px]:hidden"
            />
          </>
        }
      >
        <div className="mb-12 flex max-w-[640px] flex-col gap-4">
          <Reveal variant="left" duration={700}>
            <span className="eyebrow eyebrow-rule">The service ladder</span>
          </Reveal>
          <TextReveal
            text="Cleanup to controller."
            className="m-0 font-display text-h2 text-ink"
          />
          <Reveal delay={160} duration={800}>
            <p className="m-0 text-lead leading-relaxed text-slate">
              The order below reflects how businesses grow with us. Start where you are today,
              and add the next rung when you&rsquo;re ready.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-6">
          {services.map((service, i) => (
            <Reveal key={service._id} variant="up" delay={i * 60} duration={850}>
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
    <Spotlight
      as="article"
      dark={top}
      className={cn(
        "group grid grid-cols-[.85fr_1.4fr] gap-10 rounded-panel border p-9 transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-[820px]:grid-cols-1 max-[820px]:gap-6 max-[767px]:p-7",
        top
          ? "surface-dark border-gold/30 text-white shadow-[var(--shadow-gold)] hover:-translate-y-1 hover:shadow-[0_28px_70px_-20px_rgba(201,162,39,0.6)]"
          : "border-rule bg-white/75 shadow-[var(--shadow-rest)] backdrop-blur-sm hover:-translate-y-1 hover:border-gold/55 hover:bg-white hover:shadow-[var(--shadow-gold)]",
      )}
    >
      {/* Left */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          {top ? (
            <span className="flex h-[52px] w-[52px] items-center justify-center rounded-btn border border-dark-border bg-white/5 text-gold transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:border-gold/70 group-hover:bg-gold/10">
              <LineIcon name={service.icon} size={24} />
            </span>
          ) : (
            <IconTile icon={service.icon} tile={52} size={24} />
          )}
          {top ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold bg-gold/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-gold">
              <LineIcon name="star" size={12} />
              Most popular
            </span>
          ) : (
            <span className="font-mono text-[13px] font-medium tracking-[0.1em] text-brass transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
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
          <Link
            href={`/services/${service.slug}`}
            className={cn(
              "transition-colors duration-300",
              top ? "hover:text-gold" : "hover:text-brass",
            )}
          >
            {service.title}
          </Link>
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
              "mt-1 flex gap-3 rounded-input border-l-2 border-gold pl-4 transition-colors duration-500",
              top ? "bg-white/[0.03]" : "bg-goldwash/40",
              "py-2",
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
          href={`/services/${service.slug}`}
          className={cn(
            "link-line mt-1 inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors duration-300",
            top ? "text-gold hover:text-white" : "text-brass hover:text-ink",
          )}
        >
          Explore service
          <LineIcon
            name="arrow-right"
            size={15}
            className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
          />
        </Link>
      </div>
    </Spotlight>
  );
}
