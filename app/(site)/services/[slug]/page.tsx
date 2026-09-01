import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getHomeData, getService, getServiceSlugs } from "@/lib/data";
import { Section, Orb } from "@/components/layout/Section";
import { Button } from "@/components/primitives/Button";
import { Reveal } from "@/components/primitives/Reveal";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { TextReveal, FadeIn } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Spotlight } from "@/components/motion/Spotlight";
import { LineIcon } from "@/components/icons/LineIcon";
import { IconTile } from "@/components/primitives/IconTile";
import { cn } from "@/lib/cn";
import type { Service } from "@/lib/types";

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
    title: service.seo?.metaTitle ?? service.title,
    description: service.seo?.metaDescription ?? service.description,
  };
}

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
          <div className="grid grid-cols-[1.1fr_minmax(0,0.9fr)] items-start gap-14 max-[980px]:grid-cols-1 max-[980px]:gap-10">
            <div className="flex min-w-0 flex-col items-start gap-6">
              <Reveal variant="left" duration={700}>
                <nav
                  aria-label="Breadcrumb"
                  className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-slate"
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
                <span className="eyebrow eyebrow-rule">
                  Service {step} / {total}
                </span>
              </Reveal>

              <TextReveal
                as="h1"
                text={service.title}
                delay={120}
                step={50}
                className="m-0 max-w-[18ch] font-display text-hero text-ink"
              />

              {service.tagline ? (
                <FadeIn
                  delay={260}
                  className="m-0 max-w-[34ch] font-display text-[clamp(19px,2vw,24px)] italic leading-snug text-brass"
                >
                  {service.tagline}
                </FadeIn>
              ) : null}

              <FadeIn delay={320} className="m-0 max-w-[58ch] text-lead text-slate">
                {service.detail ?? service.description}
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

            {/* Who it's for */}
            {service.audience ? (
              <div className="min-w-0 max-[980px]:mt-2">
                <Reveal variant="right" delay={200} duration={900} className="group relative">
                  <span
                    aria-hidden
                    className="absolute -bottom-5 -right-5 z-0 h-full w-full rounded-panel border border-gold/45 bg-goldwash max-[520px]:-bottom-3 max-[520px]:-right-3"
                  />
                  <aside className="relative z-[1] flex flex-col gap-5 rounded-panel border border-rule bg-white/85 p-8 shadow-[var(--shadow-rest)] backdrop-blur-sm max-[767px]:p-7">
                    <IconTile icon={service.icon} tile={52} size={24} />
                    <div className="flex flex-col gap-2.5">
                      <span className="eyebrow">Who it&rsquo;s for</span>
                      <p className="m-0 text-[16.5px] leading-relaxed text-ink">
                        {service.audience}
                      </p>
                    </div>
                  </aside>
                </Reveal>
              </div>
            ) : null}
          </div>
        </div>

        <div aria-hidden className="rule-fade absolute inset-x-0 bottom-0 z-[2]" />
      </section>

      {/* What's included + what you get */}
      {service.includes?.length || service.youGet ? (
        <Section
          ground="quiet"
          atmosphere={
            <Orb
              tone="gold"
              drift="b"
              className="-left-[16%] top-[10%] h-[560px] w-[560px] opacity-60 max-[900px]:hidden"
            />
          }
        >
          <div className="grid grid-cols-[1fr_minmax(0,0.85fr)] items-start gap-14 max-[980px]:grid-cols-1 max-[980px]:gap-10">
            <div className="flex min-w-0 flex-col gap-8">
              <div className="flex flex-col gap-4">
                <Reveal variant="left" duration={700}>
                  <span className="eyebrow eyebrow-rule">What&rsquo;s included</span>
                </Reveal>
                <TextReveal
                  text="The scope, in plain terms."
                  className="m-0 font-display text-h2 text-ink"
                />
              </div>

              {service.includes?.length ? (
                <ul className="m-0 flex list-none flex-col gap-0 p-0">
                  {service.includes.map((item, i) => (
                    <Reveal key={item} as="li" variant="up" delay={i * 70} duration={750}>
                      <div className="flex items-start gap-4 border-t border-rule py-5">
                        <span
                          aria-hidden
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-goldwash text-brass"
                        >
                          <LineIcon name="check" size={13} />
                        </span>
                        <span className="text-[15.5px] leading-relaxed text-ink">
                          {item}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              ) : null}
            </div>

            {service.youGet ? (
              <Reveal variant="right" delay={160} duration={900} className="min-w-0">
                <Spotlight
                  as="section"
                  dark
                  className="surface-dark flex flex-col gap-4 rounded-panel border border-gold/30 p-9 text-white shadow-[var(--shadow-gold)] max-[767px]:p-7"
                >
                  <span className="eyebrow text-gold">What you get</span>
                  <p className="m-0 text-[16.5px] leading-relaxed text-dark-body">
                    {service.youGet}
                  </p>
                  <span aria-hidden className="my-1 h-px w-full bg-white/10" />
                  <Button href="/#contact" variant="inverse" size="sm" className="self-start">
                    Talk to us about this
                    <LineIcon name="arrow-right" size={15} />
                  </Button>
                </Spotlight>
              </Reveal>
            ) : null}
          </div>
        </Section>
      ) : null}

      {/* In practice */}
      {service.practiceExamples?.length ? (
        <Section ground="bone" ruleTop>
          <div className="mb-10 flex max-w-[620px] flex-col gap-4">
            <Reveal variant="left" duration={700}>
              <span className="eyebrow eyebrow-rule">In practice</span>
            </Reveal>
            <TextReveal
              text="What this looks like on the ground."
              className="m-0 font-display text-h2 text-ink"
            />
            <Reveal delay={160} duration={800}>
              <p className="m-0 text-lead leading-relaxed text-slate">
                Two real engagements, described without the client names.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-6 max-[820px]:grid-cols-1">
            {service.practiceExamples.map((example, i) => (
              <Reveal
                key={example._key ?? example.title}
                variant="up"
                delay={i * 80}
                duration={850}
              >
                <Spotlight
                  as="article"
                  className="group flex h-full flex-col gap-4 rounded-panel border border-rule bg-white/75 p-8 shadow-[var(--shadow-rest)] backdrop-blur-sm transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-gold/55 hover:bg-white hover:shadow-[var(--shadow-gold)] max-[767px]:p-7"
                >
                  <span className="font-mono text-[13px] font-medium tracking-[0.1em] text-brass">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="m-0 font-display text-[21px] font-semibold text-ink">
                    {example.title}
                  </h3>
                  <p className="m-0 text-[15px] leading-relaxed text-slate">
                    {example.body}
                  </p>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      {/* The rest of the ladder */}
      <Section ground="white" ruleTop>
        <div className="mb-10 flex max-w-[620px] flex-col gap-4">
          <Reveal variant="left" duration={700}>
            <span className="eyebrow eyebrow-rule">Keep exploring</span>
          </Reveal>
          <TextReveal
            text="The rest of the ladder."
            className="m-0 font-display text-h2 text-ink"
          />
          <Reveal delay={160} duration={800}>
            <p className="m-0 text-lead leading-relaxed text-slate">
              Every service stands on its own, and they stack. Start where you are today,
              and add the next rung when you&rsquo;re ready.
            </p>
          </Reveal>
        </div>

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

        <div className="mt-10">
          <Button href="/services" variant="secondary" size="sm">
            See the full service ladder
            <LineIcon name="arrow-right" size={15} />
          </Button>
        </div>
      </Section>

      <CtaBanner
        eyebrow="Let's talk"
        banner={{
          heading: `Ready to hand off ${service.title.toLowerCase()}?`,
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

/** Compact card linking to a sibling service. */
function ServiceTeaser({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group flex h-full flex-col gap-3.5 rounded-panel border border-rule bg-white/75 p-7 shadow-[var(--shadow-rest)] backdrop-blur-sm transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
        "hover:-translate-y-1 hover:border-gold/55 hover:bg-white hover:shadow-[var(--shadow-gold)]",
      )}
    >
      <div className="flex items-center justify-between">
        <IconTile icon={service.icon} tile={44} size={20} />
        <span className="font-mono text-[12px] font-medium tracking-[0.1em] text-brass">
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <h3 className="m-0 font-display text-[19px] font-semibold text-ink">
        {service.title}
      </h3>
      <p className="m-0 text-[14.5px] leading-relaxed text-slate">{service.description}</p>
      <span className="link-line mt-auto inline-flex w-fit items-center gap-1.5 pt-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-brass transition-colors duration-300 group-hover:text-ink">
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
