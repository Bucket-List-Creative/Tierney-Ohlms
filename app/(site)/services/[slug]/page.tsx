import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getHomeData, getService, getServiceSlugs } from "@/lib/data";
import { Orb } from "@/components/layout/Section";
import { Button } from "@/components/primitives/Button";
import { Reveal } from "@/components/primitives/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { TextReveal, FadeIn } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Parallax } from "@/components/motion/Parallax";
import { LineIcon } from "@/components/icons/LineIcon";
import { IconTile } from "@/components/primitives/IconTile";
import type { Service } from "@/lib/types";
import { absoluteUrl } from "@/lib/seo/urls";

type Params = { slug: string };

/** Every service gets a real page — required for the static export target. */
export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return {
    alternates: { canonical: absoluteUrl(`/services/${slug}`) },
    title: service.seo?.metaTitle ?? service.title,
    description: service.seo?.metaDescription ?? service.description,
  };
}

/**
 * A service's own page. The section grammar is the homepage's, deliberately:
 * light aura hero → bone → dark band → white → quiet → dark CTA, with the
 * heading emphasis, icon tiles, gradient numerals and gold hairlines the
 * homepage established.
 */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const { services, site } = await getHomeData();

  const index = services.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();

  const service = services[index];
  const others = services.filter((s) => s.slug !== slug);
  const step = String(index + 1).padStart(2, "0");
  const total = String(services.length).padStart(2, "0");

  // Emphasise the last word of a multi-word title, the way every homepage
  // heading emphasises its closing phrase. One-word titles stay plain.
  const titleWords = service.title.split(" ");
  const titleEmphasis = titleWords.length > 1 ? titleWords.at(-1) : undefined;

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

        <div className="container-x relative z-[1] pb-20 pt-16 max-[980px]:pb-14 max-[980px]:pt-12">
          <div className="grid grid-cols-[1.1fr_minmax(0,0.9fr)] items-center gap-16 max-[980px]:grid-cols-1 max-[980px]:gap-11">
            <div className="flex min-w-0 flex-col items-start gap-5">
              <Reveal variant="left" duration={700}>
                <nav
                  aria-label="Breadcrumb"
                  className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[.14em] text-dark-label"
                >
                  <Link href="/" className="link-line transition-colors hover:text-ink">
                    Home
                  </Link>
                  <span aria-hidden>/</span>
                  <Link
                    href="/services"
                    className="link-line transition-colors hover:text-ink"
                  >
                    Services
                  </Link>
                  <span aria-hidden>/</span>
                  <span className="text-ink">{service.title}</span>
                </nav>
              </Reveal>

              <Reveal variant="left" delay={80} duration={700}>
                <span className="eyebrow">Service {step}</span>
              </Reveal>

              <TextReveal
                as="h1"
                text={service.title}
                emphasis={titleEmphasis}
                delay={120}
                step={50}
                className="m-0 max-w-[16ch] font-display text-hero text-ink"
              />

              {service.tagline ? (
                <FadeIn
                  delay={260}
                  className="m-0 max-w-[34ch] font-display text-[clamp(19px,2vw,25px)] italic leading-snug text-brass"
                >
                  {service.tagline}
                </FadeIn>
              ) : null}

              <FadeIn
                delay={320}
                className="m-0 max-w-[56ch] text-[15.5px] leading-relaxed text-slate"
              >
                {service.detail ?? service.description}
              </FadeIn>

              <Reveal delay={420} duration={700} className="mt-2">
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
              <Parallax strength={-28} minWidth={980}>
                <Reveal variant="right" delay={180} duration={900} className="relative">
                  <span
                    aria-hidden
                    className="absolute -bottom-5 -right-5 z-0 h-full w-full rounded-panel border border-gold/45 bg-goldwash max-[520px]:-bottom-3 max-[520px]:-right-3"
                  />
                  <ServiceBrief service={service} step={step} total={total} />
                </Reveal>
              </Parallax>
            </div>
          </div>
        </div>

        <div aria-hidden className="rule-fade absolute inset-x-0 bottom-0 z-[2]" />
      </section>

      {/* What's included */}
      {service.includes?.length ? (
        <section className="mesh-bone border-t border-rule">
          <div className="container-x py-24 max-[767px]:py-16">
            <header className="mb-12 flex max-w-[600px] flex-col gap-4">
              <Reveal variant="left" duration={700}>
                <span className="eyebrow">What&rsquo;s included</span>
              </Reveal>
              <TextReveal
                text="The scope, in plain terms."
                emphasis="plain terms."
                className="m-0 font-display text-[clamp(28px,3vw,40px)] font-medium leading-[1.14]"
              />
              <Reveal delay={160} duration={800}>
                <p className="m-0 text-[15.5px] leading-relaxed text-slate">
                  No hourly surprises and no line-by-line negotiation. This is what the
                  engagement covers, every month.
                </p>
              </Reveal>
            </header>

            <ul className="m-0 grid list-none grid-cols-2 gap-5 p-0 max-[860px]:grid-cols-1">
              {service.includes.map((item, i) => (
                <Reveal key={item} as="li" variant="up" delay={i * 70} duration={800}>
                  <article className="grid h-full grid-cols-[auto_1fr] items-center gap-7 rounded-panel border border-rule bg-white p-7 transition duration-300 hover:-translate-y-[3px] hover:border-gold hover:shadow-[var(--shadow-hover)] max-[560px]:gap-5">
                    <div className="flex flex-col gap-3">
                      <span className="gradient-text font-display text-[42px] font-medium leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <i aria-hidden className="block h-px w-11 bg-gold" />
                    </div>
                    <p className="m-0 text-[15px] leading-relaxed text-slate">{item}</p>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* What you get */}
      {service.youGet ? (
        <section className="mesh-dark border-t border-white/10 text-white">
          <div className="container-x py-20 max-[767px]:py-14">
            <Reveal variant="up" duration={850}>
              <div className="grid items-center gap-10 min-[981px]:grid-cols-[1fr_auto]">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[.14em] text-gold">
                    What you get
                  </span>
                  <p className="mb-0 mt-3 max-w-[46ch] font-display text-[clamp(21px,2.1vw,28px)] italic leading-snug">
                    {service.youGet}
                  </p>
                </div>
                <Button href="/#contact" variant="inverse">
                  Talk to our team <LineIcon name="arrow-right" size={16} />
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* In practice */}
      {service.practiceExamples?.length ? (
        <section className="border-t border-rule bg-white">
          <div className="container-x py-24 max-[767px]:py-16">
            <header className="mb-12 flex max-w-[620px] flex-col gap-4">
              <Reveal variant="left" duration={700}>
                <span className="eyebrow">In practice</span>
              </Reveal>
              <TextReveal
                text="What this looks like on the ground."
                emphasis="on the ground."
                className="m-0 font-display text-[clamp(28px,3vw,40px)] font-medium leading-[1.14]"
              />
              <Reveal delay={160} duration={800}>
                <p className="m-0 text-[15.5px] leading-relaxed text-slate">
                  Real engagements, described without the client names.
                </p>
              </Reveal>
            </header>

            <div className="grid grid-cols-2 gap-6 max-[820px]:grid-cols-1">
              {service.practiceExamples.map((example, i) => (
                <Reveal
                  key={example._key ?? example.title}
                  variant="up"
                  delay={i * 80}
                  duration={850}
                >
                  <article className="flex h-full flex-col gap-4 rounded-panel border border-rule bg-white p-8 transition duration-300 hover:-translate-y-[3px] hover:border-gold hover:shadow-[var(--shadow-hover)] max-[560px]:p-7">
                    <span className="font-mono text-[10px] uppercase tracking-[.14em] text-dark-label">
                      Engagement {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="m-0 font-display text-[22px] font-semibold text-ink">
                      {example.title}
                    </h3>
                    <p className="m-0 text-[15px] leading-relaxed text-slate">
                      {example.body}
                    </p>
                    <SegmentRule className="mt-auto pt-6" />
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* The rest of the ladder */}
      <section className="mesh-quiet border-t border-rule">
        <div className="container-x py-24 max-[767px]:py-16">
          <header className="mb-12 flex max-w-[620px] flex-col gap-4">
            <Reveal variant="left" duration={700}>
              <span className="eyebrow">Keep exploring</span>
            </Reveal>
            <TextReveal
              text="The rest of the ladder."
              emphasis="the ladder."
              className="m-0 font-display text-[clamp(28px,3vw,40px)] font-medium leading-[1.14]"
            />
            <Reveal delay={160} duration={800}>
              <p className="m-0 text-[15.5px] leading-relaxed text-slate">
                Every service stands on its own, and they stack. Start where you are
                today, and add the next rung when you&rsquo;re ready.
              </p>
            </Reveal>
          </header>

          <div className="grid grid-cols-3 gap-5 max-[980px]:grid-cols-2 max-[640px]:grid-cols-1">
            {others.map((other, i) => (
              <Reveal key={other._id} variant="up" delay={i * 50} duration={800}>
                <ServiceTeaser
                  service={other}
                  index={services.findIndex((s) => s.slug === other.slug) + 1}
                />
              </Reveal>
            ))}
          </div>

          <div className="mt-11">
            <Button href="/services" variant="secondary" size="sm">
              See the full service ladder
              <LineIcon name="arrow-right" size={15} />
            </Button>
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow="Let's talk"
        banner={{
          heading: `Ready to hand this one off?`,
          lead: "Tell us where things stand today and we'll map out what taking this off your plate actually looks like. No pressure, no obligation.",
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

/**
 * The hero's companion panel — a paper "brief" in the same visual language as
 * the homepage hero's floating ledger and invoice cards: white stock, hairline
 * border, mono spec labels, and the ink/gold/rule segment accent.
 */
function ServiceBrief({
  service,
  step,
  total,
}: {
  service: Service;
  step: string;
  total: string;
}) {
  const rows: [string, string][] = [
    ["Billing", "One flat monthly fee"],
    ["Commitment", "No long-term contract"],
    ["Response", "Within one business day"],
  ];

  return (
    <article className="relative z-[1] flex flex-col gap-5 rounded-panel border border-rule bg-white p-8 shadow-[0_24px_48px_rgba(17,17,17,0.09)] max-[560px]:p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[.14em] text-dark-label">
          Service brief
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[.14em] text-brass">
          {step} / {total}
        </span>
      </div>

      <IconTile icon={service.icon} tile={44} size={19} />

      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[.14em] text-dark-label">
          Who it&rsquo;s for
        </span>
        <p className="m-0 text-[15px] leading-relaxed text-ink">
          {service.audience ?? service.description}
        </p>
      </div>

      <i aria-hidden className="block h-px w-11 bg-gold" />

      <div className="flex flex-col">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex min-h-[32px] items-center justify-between gap-4 border-b border-rule text-[12px] last:border-b-0"
          >
            <span className="font-mono text-[10px] uppercase tracking-[.12em] text-dark-label">
              {label}
            </span>
            <span className="text-right text-ink">{value}</span>
          </div>
        ))}
      </div>

      <SegmentRule />
    </article>
  );
}

/** The hero invoice card's three-part accent bar, reused as a quiet rule. */
function SegmentRule({ className }: { className?: string }) {
  return (
    <div aria-hidden className={className}>
      <div className="flex gap-[5px]">
        <i className="h-1 flex-[2] rounded-[2px] bg-ink" />
        <i className="h-1 flex-1 rounded-[2px] bg-gold" />
        <i className="h-1 flex-[0.8] rounded-[2px] bg-rule" />
      </div>
    </div>
  );
}

/** Compact card linking to a sibling service — the WhyUs feature card, linked. */
function ServiceTeaser({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col gap-3.5 rounded-panel border border-rule bg-white p-6 transition duration-300 hover:-translate-y-[3px] hover:border-gold hover:shadow-[var(--shadow-hover)]"
    >
      <div className="flex items-center justify-between">
        <IconTile icon={service.icon} tile={44} size={19} />
        <span className="font-mono text-[10px] uppercase tracking-[.14em] text-dark-label">
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <h3 className="m-0 font-display text-[18px] font-semibold text-ink">
        {service.title}
      </h3>
      <p className="m-0 text-[14px] leading-relaxed text-slate">{service.description}</p>
      <span className="link-line mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-[12px] font-semibold uppercase tracking-[.08em] text-brass transition-colors duration-300 group-hover:text-ink">
        Explore service
        <LineIcon
          name="arrow-right"
          size={14}
          className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
