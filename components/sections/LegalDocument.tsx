import Link from "next/link";
import { Section, Orb } from "@/components/layout/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { LEGAL_REVIEW_PENDING, type LegalDocument as Doc } from "@/lib/content/legal";
import type { SiteSettings } from "@/lib/types";

/**
 * Shared shell for the Privacy Policy and Terms of Service.
 *
 * Deliberately plain: legal text is read, not scanned, so this is one column
 * at a comfortable measure with the site's own type — no cards, no columns,
 * no reveal choreography beyond a single entrance.
 */
export function LegalDocument({ doc, site }: { doc: Doc; site: SiteSettings }) {
  return (
    <Section
      ground="white"
      atmosphere={
        <Orb
          tone="gold"
          drift="a"
          className="right-[-10%] top-[-18%] h-[560px] w-[560px] opacity-40"
        />
      }
    >
      <Reveal duration={800} className="flex flex-col gap-4">
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
          <span className="text-ink">{doc.title}</span>
        </nav>

        <span className="eyebrow">{doc.eyebrow}</span>
        <h1 className="m-0 font-display text-[clamp(30px,4vw,46px)] font-medium leading-[1.12]">
          {doc.title}
        </h1>
        <p className="m-0 font-mono text-[12px] uppercase tracking-[.14em] text-dark-label">
          Last updated {doc.updated}
        </p>
      </Reveal>

      {LEGAL_REVIEW_PENDING ? (
        <div
          role="note"
          className="mt-8 max-w-[70ch] rounded-panel border border-gold/45 bg-gold/[.07] p-5 text-[14px] leading-relaxed text-ink"
        >
          <strong className="font-semibold">Draft pending review.</strong> This
          text was prepared from how the website actually works, but it has not
          yet been reviewed by a qualified professional and should not be relied
          on as final.
        </div>
      ) : null}

      <Reveal delay={120} duration={800}>
        <p className="mb-0 mt-8 max-w-[70ch] text-[16.5px] leading-[1.75] text-slate">
          {doc.intro}
        </p>
      </Reveal>

      <div className="mt-14 flex max-w-[70ch] flex-col gap-11">
        {doc.sections.map((section, i) => (
          <Reveal key={section.heading} delay={60 + i * 40} duration={700}>
            <section className="flex flex-col gap-4">
              <h2 className="m-0 font-display text-[21px] font-semibold leading-snug text-ink">
                {section.heading}
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="m-0 text-[15.5px] leading-[1.75] text-slate"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          </Reveal>
        ))}

        <Reveal duration={700}>
          <section className="flex flex-col gap-4 border-t border-rule pt-11">
            <h2 className="m-0 font-display text-[21px] font-semibold leading-snug text-ink">
              Contact us
            </h2>
            <p className="m-0 text-[15.5px] leading-[1.75] text-slate">
              Questions about this page, or about information we hold? Reach us
              at{" "}
              <a
                href={`mailto:${site.email}`}
                className="link-line text-ink underline-offset-4"
              >
                {site.email}
              </a>{" "}
              or{" "}
              <a href={site.phoneHref} className="link-line text-ink underline-offset-4">
                {site.phone}
              </a>
              .
            </p>
            <address className="m-0 text-[15.5px] not-italic leading-[1.75] text-slate">
              {site.addressLine1}
              <br />
              {site.addressLine2}
            </address>
          </section>
        </Reveal>
      </div>
    </Section>
  );
}
