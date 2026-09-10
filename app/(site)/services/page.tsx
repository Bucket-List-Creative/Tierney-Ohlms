import type { Metadata } from "next";
import Link from "next/link";
import { getHomeData } from "@/lib/data";
import { Orb } from "@/components/layout/Section";
import { Button } from "@/components/primitives/Button";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ServiceLadder } from "@/components/sections/ServiceLadder";
import { Reveal } from "@/components/primitives/Reveal";
import { TextReveal, FadeIn } from "@/components/motion/TextReveal";
import { LineIcon } from "@/components/icons/LineIcon";
import { absoluteUrl } from "@/lib/seo/urls";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/services") },
  title: "Outsourced Accounting Services",
  description:
    "From cleanup to controller oversight: bookkeeping, monthly close, CPA-prepared financials, tax, payroll, and automation. One flat monthly fee.",
};

export default async function ServicesPage() {
  const { services, site } = await getHomeData();

  const entryPoints = [
    { slug: "catch-up-cleanup", title: "Strengthen your accounting department", tagline: "For companies around $2M–$20M in revenue", description: "Start with cleanup and a reliable close. We can own the day-to-day accounting or supplement your existing team, with controller oversight where you need it." },
    { slug: "controller-services-reporting", title: "Outsource your accounting department", tagline: "For companies around $2M–$20M ready for full support", description: "Bring day-to-day staff accounting, monthly close, and controller-level reporting together with one team. We take ownership of the accounting function so you can focus on running the business." },
    { slug: "shared-services", title: "Shared services for larger companies", tagline: "Focused support within businesses up to $300M in revenue", description: "Keep your internal finance leadership and give us ownership of a defined function: accounts payable, reconciliation, or other recurring accounting operations across locations and systems." },
  ].flatMap((entry) => {
    const service = services.find((item) => item.slug === entry.slug);
    return service ? [{ ...service, ...entry, detail: entry.description, topTier: false }] : [];
  });
  const addOnSlugs = ["tax-preparation-planning", "payroll", "systems-automation"];

  return (
    <>
      {/* Hero */}
      <section className="atmos aura-hero">
        <Orb
          tone="gold"
          drift="a"
          className="-right-[10%] -top-[38%] h-[680px] w-[680px] opacity-90 max-[980px]:h-[400px] max-[980px]:w-[400px]"
        />
        <Orb
          tone="bone"
          drift="b"
          className="-bottom-[42%] -left-[12%] h-[600px] w-[600px] max-[980px]:hidden"
        />

        <div className="container-x relative z-[1] pb-16 pt-16 max-[980px]:pb-12 max-[980px]:pt-12">
          <div className="flex max-w-[760px] flex-col items-start gap-6">
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
              <span className="eyebrow">Services</span>
            </Reveal>
            <TextReveal
              as="h1"
              text="Everything an accounting department does, under one roof."
              emphasis="under one roof."
              delay={120}
              step={50}
              className="m-0 max-w-[22ch] font-display text-hero text-ink"
            />
            <FadeIn delay={300} className="m-0 max-w-[58ch] text-lead text-slate">
              Accounting support for companies from $2 million to $300 million in revenue.
              Start with the right capacity for your team, from cleanup and full outsourcing to shared services.
            </FadeIn>
            <Reveal delay={420} duration={700} className="mt-1">
              <div className="flex flex-wrap gap-3.5">
                <span className="inline-flex">
                  <Button href="/#contact" variant="primary">
                    Get Started
                    <LineIcon
                      name="arrow-right"
                      size={17}
                      className="transition-transform duration-300"
                    />
                  </Button>
                </span>
                <Button href={site.phoneHref} variant="secondary">
                  <LineIcon name="phone" size={16} />
                  Call {site.phone}
                </Button>
              </div>
            </Reveal>
          </div>

        </div>

        <div aria-hidden className="rule-fade absolute inset-x-0 bottom-0 z-[2]" />
      </section>

      <ServiceLadder services={entryPoints} />

      <section className="container-x py-20">
        {[false, true].map((addOns) => (
          <div key={String(addOns)} className="mb-12 last:mb-0">
            <span className="eyebrow">{addOns ? "Additional support" : "Accounting services"}</span>
            <h2 className="mb-3 mt-3 font-display text-h2">{addOns ? "Add what your business needs." : "Build the right scope for your team."}</h2>
            <p className="mb-7 max-w-[65ch] text-slate">{addOns ? "Tax, payroll, and automation complement your accounting engagement. Choose the support that fits your operations." : "Cleanup, staff accounting, controller support, and shared services can be scoped around your existing team."}</p>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.filter((service) => addOnSlugs.includes(service.slug) === addOns).map((service) => (
                <Link key={service._id} href={`/services/${service.slug}`} className="rounded-panel border border-rule p-7 transition-colors hover:border-brass">
                  <h3 className="m-0 font-display text-xl font-semibold">{service.title}</h3>
                  <p className="mb-0 text-slate">{service.description}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <CtaBanner
        eyebrow="Let's talk"
        banner={{
          heading: "Not sure where to start?",
          lead: "Tell us about your company, your accounting team, and where you need support. We'll map out the right scope together.",
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
