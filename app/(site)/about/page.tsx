import type { Metadata } from "next";
import Link from "next/link";
import { getAboutPage, getHomeData } from "@/lib/data";
import { Section, Orb } from "@/components/layout/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button } from "@/components/primitives/Button";
import { MediaFrame } from "@/components/primitives/MediaFrame";
import { IconTile } from "@/components/primitives/IconTile";
import { Reveal } from "@/components/primitives/Reveal";
import { TextReveal, FadeIn } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { LineIcon } from "@/components/icons/LineIcon";
import type { IconKey } from "@/components/icons/registry";
import type { Founder } from "@/lib/types";
import paulOhlmsPhoto from "@/public/img/Paul Ohlms.jpg";
import danTierneyPhoto from "@/public/img/Dan Tierney.jpg";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage();
  return {
    title: about.seo?.metaTitle ?? "Our Story",
    description: about.seo?.metaDescription,
  };
}

/**
 * Body fields are authored as plain text with blank lines between paragraphs
 * (both in Sanity and in the local fallback), so every long-form field on this
 * page goes through here rather than each section re-implementing the split.
 */
function paragraphs(body?: string): string[] {
  return (body ?? "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** One icon per promise, in order; extra promises fall back to a check. */
const PROMISE_ICONS: IconKey[] = ["clock", "automation", "peace"];

const FOUNDER_PHOTOS = {
  "Paul Ohlms": paulOhlmsPhoto,
  "Dan Tierney": danTierneyPhoto,
} as const;

export default async function AboutPage() {
  const [about, { site }] = await Promise.all([getAboutPage(), getHomeData()]);
  const { hero, story, rooted, founders, promises, firstClient } = about;

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
                <span className="text-ink">Our Story</span>
              </nav>
            </Reveal>

            {hero.eyebrow ? (
              <Reveal variant="left" delay={80} duration={700}>
                <span className="eyebrow">{hero.eyebrow}</span>
              </Reveal>
            ) : null}

            <TextReveal
              as="h1"
              text={hero.heading}
              delay={120}
              step={50}
              className="m-0 max-w-[18ch] font-display text-hero text-ink"
            />

            {hero.lead ? (
              <FadeIn delay={300} className="m-0 max-w-[58ch] text-lead text-slate">
                {hero.lead}
              </FadeIn>
            ) : null}

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
                <Button href="/services" variant="secondary">
                  Explore Services
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        <div aria-hidden className="rule-fade absolute inset-x-0 bottom-0 z-[2]" />
      </section>

      {/* The story */}
      <Section
        ground="quiet"
        atmosphere={
          <Orb
            tone="gold"
            drift="b"
            className="-left-[16%] top-[10%] h-[540px] w-[540px] opacity-55 max-[900px]:hidden"
          />
        }
      >
        <div className="grid grid-cols-[0.8fr_1.2fr] gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <SectionHeader
            data={{ eyebrow: story.eyebrow, heading: story.heading }}
            className="max-[900px]:max-w-none"
            showEyebrowRule={false}
          />
          <div className="flex max-w-[62ch] flex-col gap-5">
            {paragraphs(story.body).map((p, i) => (
              <Reveal key={i} delay={i * 90} duration={800}>
                <p className="m-0 text-[16.5px] leading-[1.75] text-slate">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Rooted in St. Louis */}
      <Section
        ground="bone"
        ruleTop
        atmosphere={
          <Orb
            tone="ink"
            className="-right-[12%] bottom-[6%] h-[460px] w-[460px] max-[900px]:hidden"
          />
        }
      >
        <div className="grid grid-cols-[1.15fr_0.85fr] items-start gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <div className="flex flex-col gap-6">
            <SectionHeader
              data={{ eyebrow: rooted.eyebrow, heading: rooted.heading }}
              showEyebrowRule={false}
            />
            <div className="flex max-w-[62ch] flex-col gap-5">
              {paragraphs(rooted.body).map((p, i) => (
                <Reveal key={i} delay={i * 90} duration={800}>
                  <p className="m-0 text-[16.5px] leading-[1.75] text-slate">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {rooted.pullQuote ? (
            <Reveal variant="scale" delay={140} duration={900}>
              <figure className="relative m-0 rounded-panel border border-gold/45 bg-goldwash/60 p-9 shadow-[var(--shadow-rest)] backdrop-blur-sm max-[767px]:p-7">
                <span
                  aria-hidden
                  className="absolute left-7 top-2 font-display text-[72px] leading-none text-gold/35"
                >
                  &ldquo;
                </span>
                <blockquote className="relative m-0 pt-8">
                  <p className="m-0 font-display text-[21px] italic leading-[1.55] text-ink max-[767px]:text-[19px]">
                    {rooted.pullQuote}
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-brass">
                  <span aria-hidden className="h-px w-8 bg-gold" />
                  Tierney &amp; Ohlms
                </figcaption>
              </figure>
            </Reveal>
          ) : null}
        </div>
      </Section>

      {/* Founders */}
      <Section
        ground="quiet"
        ruleTop
        atmosphere={
          <Orb
            tone="gold"
            drift="a"
            className="-right-[14%] top-[8%] h-[520px] w-[520px] opacity-55 max-[900px]:hidden"
          />
        }
      >
        <SectionHeader
          data={{
            eyebrow: founders.eyebrow,
            heading: founders.heading ?? "Founders",
          }}
          className="mb-12"
          showEyebrowRule={false}
        />
        <div className="flex flex-col gap-10 max-[767px]:gap-7">
          {founders.people.map((person, i) => (
            <Reveal
              key={person._key ?? person.name}
              variant="up"
              delay={i * 90}
              duration={850}
            >
              <FounderCard founder={person} imageRight={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What we promise */}
      <Section ground="white" ruleTop>
        <SectionHeader
          data={{
            eyebrow: promises.eyebrow,
            heading: promises.heading ?? "What we promise",
          }}
          align="center"
          className="mb-12"
          showEyebrowRule={false}
        />
        <div className="grid grid-cols-3 gap-6 max-[900px]:grid-cols-1">
          {promises.items.map((item, i) => (
            <Reveal key={item} variant="up" delay={i * 80} duration={800}>
              <article className="group flex h-full flex-col gap-5 rounded-panel border border-rule bg-white/75 p-8 shadow-[var(--shadow-rest)] backdrop-blur-sm transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-gold/55 hover:bg-white hover:shadow-[var(--shadow-gold)] max-[767px]:p-7">
                <div className="flex items-center justify-between">
                  <IconTile icon={PROMISE_ICONS[i] ?? "check"} tile={52} size={24} />
                  <span className="font-mono text-[13px] font-medium tracking-[0.1em] text-brass transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="m-0 text-[15.5px] leading-relaxed text-slate">{item}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The first client */}
      <Section
        ground="bone"
        ruleTop
        atmosphere={
          <Orb
            tone="gold"
            drift="b"
            className="-left-[14%] bottom-[4%] h-[500px] w-[500px] opacity-50 max-[900px]:hidden"
          />
        }
      >
        <div className="grid grid-cols-[0.8fr_1.2fr] gap-14 max-[900px]:grid-cols-1 max-[900px]:gap-8">
          <SectionHeader
            data={{
              eyebrow: firstClient.eyebrow,
              heading: firstClient.heading ?? "The first client",
            }}
            showEyebrowRule={false}
          />
          <div className="flex max-w-[62ch] flex-col gap-5">
            {paragraphs(firstClient.body).map((p, i) => (
              <Reveal key={i} delay={i * 90} duration={800}>
                <p className="m-0 text-[16.5px] leading-[1.75] text-slate">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaBanner
        eyebrow="Let's talk"
        banner={{
          heading: "Facing the same problem?",
          lead: "Tell us where your books are today. We'll be straight with you about what it takes to get them where they should be.",
          cta: { label: "Get Started Today", href: "/#contact", variant: "inverse" },
        }}
        secondaryCta={{ label: `Call ${site.phone}`, href: site.phoneHref }}
        notes={[
          "One flat monthly fee",
          "A response within 24 hours",
          "Real CPAs reviewing the work",
        ]}
      />
    </>
  );
}

function FounderCard({ founder, imageRight }: { founder: Founder; imageRight: boolean }) {
  const fallbackPhoto = FOUNDER_PHOTOS[founder.name as keyof typeof FOUNDER_PHOTOS];

  return (
    <article className="group grid min-h-[520px] grid-cols-[minmax(300px,0.78fr)_minmax(0,1.22fr)] overflow-hidden rounded-panel border border-rule bg-white/80 shadow-[var(--shadow-rest)] backdrop-blur-sm transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-gold/55 hover:bg-white hover:shadow-[var(--shadow-gold)] max-[820px]:min-h-0 max-[820px]:grid-cols-1">
      <div className={imageRight ? "col-start-2 row-start-1 max-[820px]:col-start-1" : ""}>
        <MediaFrame
          image={founder.photo}
          fallback={fallbackPhoto}
          alt={`${founder.name}, ${founder.credential}`}
          placeholder={`${founder.name} — photo coming soon`}
          rounded="rounded-none"
          overlay
          fit="cover"
          objectPosition={founder.name === "Dan Tierney" ? "center top" : undefined}
          sizes="(max-width: 820px) 100vw, 38vw"
          className="h-full min-h-[520px] w-full bg-goldwash/35 max-[820px]:h-[420px] max-[820px]:min-h-0 max-[520px]:h-[340px]"
        />
      </div>

      <div
        className={`flex min-w-0 flex-col justify-center gap-5 p-10 max-[1000px]:p-8 max-[767px]:p-7 ${
          imageRight ? "col-start-1 row-start-1 max-[820px]:row-start-2" : ""
        }`}
      >
        <div className="flex flex-col gap-2 border-b border-rule pb-5">
          <h3 className="m-0 font-display text-[30px] font-semibold text-ink max-[767px]:text-[25px]">
            {founder.name}
          </h3>
          <p className="m-0 font-mono text-[11px] uppercase tracking-[0.14em] text-brass">
            {founder.credential}
          </p>
        </div>

        {paragraphs(founder.bio).map((p, i) => (
          <p key={i} className="m-0 text-[15px] leading-relaxed text-slate">
            {p}
          </p>
        ))}

        {founder.outsideWork ? (
          <div className="mt-auto flex flex-col gap-1 rounded-input border-l-2 border-gold bg-goldwash/40 py-2.5 pl-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brass">
              Outside work
            </span>
            <span className="text-[15px] leading-relaxed text-ink">
              {founder.outsideWork}
            </span>
          </div>
        ) : null}
      </div>
    </article>
  );
}
