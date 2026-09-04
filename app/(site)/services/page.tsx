import type { Metadata } from "next";
import Link from "next/link";
import { getHomeData } from "@/lib/data";
import { Orb } from "@/components/layout/Section";
import { Button } from "@/components/primitives/Button";
import { MediaFrame } from "@/components/primitives/MediaFrame";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ServiceLadder } from "@/components/sections/ServiceLadder";
import { Reveal } from "@/components/primitives/Reveal";
import { TextReveal, FadeIn } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Parallax } from "@/components/motion/Parallax";
import { LineIcon } from "@/components/icons/LineIcon";
import servicesPhoto from "@/assets/services-hero.jpg";
import { absoluteUrl } from "@/lib/seo/urls";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/services") },
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
                  className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.14em] text-dark-label"
                >
                  <Link href="/" className="link-line transition-colors hover:text-ink">
                    Home
                  </Link>
                  <span aria-hidden>/</span>
                  <span className="text-ink">Services</span>
                </nav>
              </Reveal>
              <Reveal variant="left" delay={80} duration={700}>
                <span className="eyebrow">Services</span>
              </Reveal>
              <TextReveal
                as="h1"
                text="Everything an accounting department does, under one roof."
                emphasis="under one roof."
                delay={120}
                step={50}
                className="m-0 max-w-[17ch] font-display text-hero text-ink"
              />
              <FadeIn delay={300} className="m-0 max-w-[56ch] text-[15.5px] leading-relaxed text-slate">
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

      <ServiceLadder services={services} />

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
